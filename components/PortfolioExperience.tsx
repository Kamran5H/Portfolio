"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import ThemeToggle from "./ThemeToggle";
import { resolvePortfolioView } from "@/lib/portfolio-view.mjs";
import { SITE, CV, FLAGSHIPS, EMAIL, CONTACT_CHANNELS } from "@/lib/site";

const StudioScene = dynamic(() => import("./StudioScene"), { ssr: false });
const rooms = [
  {
    id: "entrance",
    name: "Entrance",
    label: "A place for curious work",
    title: "Muhammad Kamran Ashraf",
    text: "MPhil Chemistry Researcher at Quaid-i-Azam University. Exploring materials, building scientific software, and sharing what I learn.",
    target: "top",
    action: "Read my introduction",
  },
  {
    id: "research",
    name: "Research bench",
    label: "01 / Investigate",
    title: "From structure to possibility.",
    text: "Ce-doped NiCo metal–organic frameworks for electrocatalysis. Experimental questions meet computational chemistry under the supervision of Prof. Dr. Safeer Ahmed.",
    target: "research",
    action: "Explore the research",
  },
  {
    id: "software",
    name: "Software desk",
    label: "02 / Build",
    title: "Tools with a purpose.",
    text: "From scholarly literature to university communities and daily focus. Explore the ideas, code and workflows behind my projects.",
    target: "work",
    action: "Explore projects & previews",
  },
  {
    id: "library",
    name: "Academic library",
    label: "03 / Learn & share",
    title: "A foundation that keeps growing.",
    text: "A chemistry education, classroom experience, and a practice of connecting research with useful software.",
    target: "background",
    action: "View my academic background",
  },
  {
    id: "contact",
    name: "Collaboration room",
    label: "04 / Connect",
    title: "Good work begins with a conversation.",
    text: "For research opportunities, graduate study, scientific software, and thoughtful collaborations. Based in Islamabad, Pakistan.",
    target: "contact",
    action: "All contact options",
  },
];

type View = "studio" | "reading";
let fallbackView: View = "studio";
function getView(): View {
  let saved: string | null = fallbackView;
  try {
    saved = localStorage.getItem("portfolio-view") || fallbackView;
  } catch {
    /* Visit-only preference. */
  }
  return resolvePortfolioView(
    window.location.hash,
    window.location.search,
    saved,
  );
}
function subscribe(listener: () => void) {
  window.addEventListener("portfolio-view", listener);
  window.addEventListener("hashchange", listener);
  window.addEventListener("popstate", listener);
  return () => {
    window.removeEventListener("portfolio-view", listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("popstate", listener);
  };
}

export default function PortfolioExperience({
  children,
}: {
  children: ReactNode;
}) {
  const mode = useSyncExternalStore(subscribe, getView, () => "studio" as View);
  const [active, setActive] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const journey = useRef<((position: number) => void) | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const positionRef = useRef(0);
  const navigate = (index: number) => {
    const el = scroller.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const height = el.querySelector("section")?.clientHeight || el.clientHeight;
    el.scrollTo({
      top: index * height,
      behavior: reduced ? "instant" : "smooth",
    });
  };
  const changeView = (view: View, target = "top") => {
    fallbackView = view;
    if (view === "studio") {
      activeRef.current = 0;
      positionRef.current = 0;
      setActive(0);
    }
    try {
      localStorage.setItem("portfolio-view", view);
    } catch {
      /* Visit-only preference. */
    }
    const url = new URL(window.location.href);
    url.hash = view === "studio" ? "studio-entrance" : target;
    if (view === "studio")
      for (const key of ["compare", "q", "sort", "access", "category"])
        url.searchParams.delete(key);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event("portfolio-view"));
    if (view === "reading")
      requestAnimationFrame(() => {
        const section = document.getElementById(target);
        section?.scrollIntoView({ behavior: "instant", block: "start" });
        const heading =
          section?.querySelector<HTMLElement>("h1,h2,h3,a,button");
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
      });
  };
  useEffect(() => {
    if (mode !== "studio") return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const initialRoom = rooms.findIndex(
      (room) => `#studio-${room.id}` === window.location.hash,
    );
    const frame = requestAnimationFrame(() => {
      const el = scroller.current;
      if (el && initialRoom >= 0)
        el.scrollTop =
          initialRoom *
          (el.querySelector("section")?.clientHeight || el.clientHeight);
    });
    const resize = () => {
      const el = scroller.current;
      if (el)
        el.scrollTop =
          activeRef.current *
          (el.querySelector("section")?.clientHeight || el.clientHeight);
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = old;
      window.removeEventListener("resize", resize);
    };
  }, [mode]);

  return (
    <>
      <noscript>
        <style>{`.studio-portfolio,.return-to-studio{display:none!important}.reading-portfolio[hidden]{display:block!important}`}</style>
      </noscript>
      {mode === "studio" && (
        <div className="studio-portfolio">
          <div className="studio-canvas" aria-hidden="true">
            <StudioScene
              journeyRef={journey}
              positionRef={positionRef}
              onUnavailable={() => setUnavailable(true)}
            />
          </div>
          <div className="studio-wash" aria-hidden="true" />
          <header className="studio-header">
            <button
              className="studio-brand"
              onClick={() => navigate(0)}
              aria-label="Return to studio entrance"
            >
              K<span>.</span>
              <small>A research studio</small>
            </button>
            <div className="studio-header-actions">
              <ThemeToggle />
              <button
                className="studio-view-switch"
                onClick={() => changeView("reading")}
              >
                Reading view ↗
              </button>
            </div>
          </header>
          <nav
            className="studio-room-nav"
            aria-label="Explore the research studio"
          >
            {rooms.map((room, i) => (
              <button
                key={room.id}
                aria-current={active === i ? "step" : undefined}
                onClick={() => navigate(i)}
              >
                <span>0{i}</span>
                <span>{room.name}</span>
              </button>
            ))}
          </nav>
          <div
            role="main"
            className="studio-journey"
            ref={scroller}
            tabIndex={0}
            aria-label="Studio rooms. Scroll or use the room navigation."
            onScroll={(event) => {
              const el = event.currentTarget;
              const position =
                el.scrollTop /
                Math.max(
                  1,
                  el.querySelector("section")?.clientHeight || el.clientHeight,
                );
              positionRef.current = position;
              journey.current?.(position);
              const index = Math.max(0, Math.min(4, Math.round(position)));
              if (index !== activeRef.current) {
                activeRef.current = index;
                setActive(index);
              }
            }}
          >
            {rooms.map((room, i) => (
              <section
                key={room.id}
                id={`studio-${room.id}`}
                className={`studio-room studio-room-${room.id}`}
                aria-labelledby={`studio-title-${room.id}`}
              >
                <div className="studio-copy">
                  <p className="eyebrow">{room.label}</p>
                  {i === 0 ? (
                    <p
                      role="heading"
                      aria-level={1}
                      id={`studio-title-${room.id}`}
                      className="studio-title"
                    >
                      Muhammad
                      <br />
                      <em>Kamran Ashraf.</em>
                    </p>
                  ) : (
                    <h2 id={`studio-title-${room.id}`} className="studio-title">
                      {room.title}
                    </h2>
                  )}
                  <p className="studio-description">{room.text}</p>
                  {i === 0 && (
                    <p className="studio-signature" lang="ur" dir="rtl">
                      {SITE.name.urdu}
                    </p>
                  )}
                  {i === 2 && (
                    <div className="studio-projects">
                      {FLAGSHIPS.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => changeView("reading", "work")}
                        >
                          <span>{project.name}</span>
                          <span aria-hidden="true">↗</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {i === 3 && (
                    <div className="studio-credentials">
                      <span>MPhil · QAU</span>
                      <span>BS · University of the Punjab</span>
                      <span>Chemistry & science teaching</span>
                    </div>
                  )}
                  <div className="studio-actions">
                    <button
                      className="btn btn-emerald"
                      onClick={() => changeView("reading", room.target)}
                    >
                      {room.action} <span aria-hidden="true">↗</span>
                    </button>
                    {i === 0 && (
                      <a
                        className="text-link"
                        href={CV.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View CV ↗
                      </a>
                    )}
                    {i === 2 && (
                      <button
                        className="text-link"
                        onClick={() => changeView("reading", "lab")}
                      >
                        Browse all 22 projects ↗
                      </button>
                    )}
                    {i === 4 && (
                      <a className="text-link" href={`mailto:${EMAIL}`}>
                        Email me ↗
                      </a>
                    )}
                  </div>
                  {i === 4 && (
                    <a
                      className="studio-whatsapp"
                      href={`https://wa.me/${CONTACT_CHANNELS.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp · {CONTACT_CHANNELS.whatsapp} ↗
                    </a>
                  )}
                  {i === 1 && (
                    <p className="studio-note">
                      The space and its scientific objects are conceptual
                      illustrations.
                    </p>
                  )}
                </div>
                <span className="studio-room-number" aria-hidden="true">
                  0{i}
                </span>
              </section>
            ))}
          </div>
          <footer className="studio-footer">
            <p aria-live="polite">
              0{active} / 04 <span>{rooms[active].name}</span>
            </p>
            <div>
              <button
                aria-label="Previous studio room"
                disabled={active === 0}
                onClick={() => navigate(active - 1)}
              >
                ↑
              </button>
              <button
                aria-label="Next studio room"
                disabled={active === 4}
                onClick={() => navigate(active + 1)}
              >
                ↓
              </button>
            </div>
            <span className="studio-scroll-hint">Scroll to explore</span>
          </footer>
          {unavailable && (
            <div className="studio-fallback" role="status">
              3D isn’t available on this device.{" "}
              <button onClick={() => changeView("reading")}>
                Open the complete reading view ↗
              </button>
            </div>
          )}
        </div>
      )}
      <div className="reading-portfolio" hidden={mode !== "reading"}>
        {children}
      </div>
      {mode === "reading" && (
        <button
          className="return-to-studio"
          onClick={() => changeView("studio")}
        >
          Enter 3D studio ↗
        </button>
      )}
    </>
  );
}
