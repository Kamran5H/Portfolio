import Image from "next/image";
import { SITE } from "@/lib/site";
import CVButton from "./CVButton";
import FrameworkLink from "./FrameworkLink";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero section-shell"
      aria-labelledby="intro-title"
    >
      <HeroBackground />
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Physical chemistry · Scientific
          software
        </p>
        <h1 id="intro-title" className="display hero-name">
          Muhammad
          <br />
          <span>Kamran Ashraf</span>
        </h1>
        <p lang="ur" dir="rtl" className="font-urdu hero-signature">
          {SITE.name.urdu}
        </p>
        <p className="hero-role">
          MPhil Chemistry Researcher
          <br />
          <span>Quaid-i-Azam University, Islamabad</span>
        </p>
        <p className="hero-intro">
          I study materials for electrochemical energy systems and build
          software that makes research and everyday work more manageable.
        </p>
        <div className="action-row">
          <a className="btn btn-emerald" href="#research">
            Explore my research <span aria-hidden="true">↓</span>
          </a>
          <CVButton />
        </div>
        <div className="hero-context">
          <p>
            Supervised by <strong>Prof. Dr. Safeer Ahmed</strong>
          </p>
          <a href="#contact">
            Research, scientific software &amp; collaboration{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <br />
          <FrameworkLink />
        </div>
      </div>
      <figure className="hero-portrait hero-portrait--solo">
        <div className="portrait-index">
          <span>Developer &amp; Scholar</span>
          <span>Muhammad Kamran Ashraf</span>
        </div>
        <a
          className="portrait-frame"
          href="/images/kamran-portrait.jpg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View full portrait of Muhammad Kamran Ashraf (opens in a new tab)"
        >
          <Image
            src="/images/kamran-portrait.jpg"
            alt="Muhammad Kamran Ashraf — Developer & Computational Physical Chemist"
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 760px) 90vw, 40vw"
            className="portrait-image"
          />
        </a>
        <figcaption>
          <span>
            <strong>Developer: Kamran Ashraf</strong>
            <br />
            AI Systems Architect &bull; Physical Chemist
          </span>
          <a
            className="photo-original-link"
            href="/images/certificate-presentation.jpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View academic award and certificate presentation photograph"
          >
            Award Presentation <span aria-hidden="true">↗</span>
          </a>
        </figcaption>
      </figure>
      <div className="hero-strip">
        <span className="eyebrow">Areas of focus</span>
        <p>{SITE.focus.join(" / ")}</p>
        <a href="#work">
          Selected software <span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  );
}
