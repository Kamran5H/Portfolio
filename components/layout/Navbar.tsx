"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

const SECTION_IDS = ["services", "about", "process", "tools", "results", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>("services");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { id: "services" as const, label: "Services" },
      { id: "about" as const, label: "About" },
      { id: "process" as const, label: "Process" },
      { id: "tools" as const, label: "Tools" },
      { id: "results" as const, label: "Results" },
      { id: "contact" as const, label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.5)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const next = visible[0].target.id as SectionId;
        setActiveSection(next);
      },
      { threshold: [0, 0.5, 1] }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToId = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-[rgba(2,4,9,0.85)] backdrop-blur-[20px] border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[76px] flex items-center justify-between gap-6">
          <a
            href="#"
            aria-label="KamranAshraf.com home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
          >
            <div
              className={clsx(
                "w-[36px] h-[36px] rounded-[4px] border border-[var(--accent-cyan)]",
                "bg-[rgba(0,212,255,0.08)] flex items-center justify-center",
                "font-mono font-bold text-[16px] text-[var(--accent-cyan)]",
                "hover:shadow-[var(--glow-cyan)] transition-shadow duration-200"
              )}
            >
              [KA]
            </div>
            <div className="font-ibm text-[12px] text-[var(--text-muted)] whitespace-nowrap">
              kamranashraf.com
            </div>
          </a>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "font-ibm uppercase text-[13px] tracking-[0.1em] transition-colors duration-200 relative",
                    "after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:bg-[var(--accent-cyan)]",
                    "after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
                    "hover:text-[var(--accent-cyan)] hover:after:scale-x-100",
                    isActive ? "text-[var(--accent-cyan)] after:scale-x-100" : "text-[var(--text-secondary)]"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <motion.a
            href="#contact"
            whileTap={{ scale: 0.97 }}
            className={clsx(
              "hidden md:inline-flex items-center justify-center",
              "border border-[var(--accent-cyan)] text-[var(--accent-cyan)]",
              "font-ibm uppercase text-[12px] tracking-[0.1em]",
              "px-[20px] py-2 rounded-[4px] transition-colors duration-200",
              "hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] hover:shadow-[var(--glow-cyan)]"
            )}
          >
            Hire Me →
          </motion.a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-[44px] h-[44px] flex items-center justify-center"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="relative w-[26px] h-[18px]">
              <motion.span
                className="absolute left-0 right-0 h-[2px] bg-[var(--text-secondary)] rounded"
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 right-0 top-[8px] h-[2px] bg-[var(--text-secondary)] rounded"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute left-0 right-0 h-[2px] bg-[var(--text-secondary)] rounded"
                style={{ top: 16 }}
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[999] bg-[rgba(2,4,9,0.98)] backdrop-blur-[20px]"
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center gap-7">
                <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-6">
                  {navItems.map((item) => {
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId(item.id);
                          setMenuOpen(false);
                        }}
                        className={clsx(
                          "font-mono text-[24px] text-[var(--text-primary)]",
                          "tracking-[0.05em] hover:text-[var(--accent-cyan)] transition-colors duration-150"
                        )}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="p-5">
                <motion.a
                  href="#contact"
                  whileTap={{ scale: 0.97 }}
                  className={clsx(
                    "w-full inline-flex items-center justify-center",
                    "border border-[var(--accent-cyan)] text-[var(--accent-cyan)]",
                    "font-ibm uppercase text-[12px] tracking-[0.1em]",
                    "px-[20px] py-[14px] rounded-[4px] transition-colors duration-200",
                    "hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] hover:shadow-[var(--glow-cyan)]"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("contact");
                    setMenuOpen(false);
                  }}
                >
                  Hire Me →
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

