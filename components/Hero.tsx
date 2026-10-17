import Image from "next/image";
import { SITE } from "@/lib/site";
import CVButton from "./CVButton";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero section-shell"
      aria-labelledby="intro-title"
    >
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
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-index">
          <span>01 / Researcher &amp; developer</span>
          <span>ISB, PK</span>
        </div>
        <div className="portrait-frame">
          <div className="portrait-orbit" aria-hidden="true" />
          <Image
            src="/images/portrait.webp"
            alt="Portrait of Muhammad Kamran Ashraf"
            width={433}
            height={577}
            priority
            sizes="(max-width: 760px) 90vw, 40vw"
            className="portrait-image"
          />
        </div>
        <figcaption>
          <span>
            From materials questions
            <br />
            to practical tools.
          </span>
          <span className="portrait-mark" aria-hidden="true">
            K.
          </span>
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
