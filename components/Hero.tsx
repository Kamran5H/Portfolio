import Image from "next/image";
import { SITE } from "@/lib/site";
import CVButton from "./CVButton";
import FrameworkLink from "./FrameworkLink";

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
          <br />
          <FrameworkLink />
        </div>
      </div>
      <figure className="hero-portrait hero-portrait--event">
        <div className="portrait-index">
          <span>Academic engagement</span>
          <span>Certificate presentation</span>
        </div>
        <a
          className="portrait-frame"
          href="/images/certificate-presentation.jpg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the full certificate presentation photograph (opens in a new tab)"
        >
          <Image
            src="/images/certificate-presentation.jpg"
            alt="Muhammad Kamran Ashraf (centre) receiving a certificate, with two presenters at an academic event"
            width={2560}
            height={2197}
            priority
            sizes="(max-width: 760px) 90vw, 40vw"
            className="portrait-image"
          />
        </a>
        <figcaption>
          <span>
            Certificate presentation
            <br />
            Muhammad Kamran Ashraf (centre)
          </span>
          <a
            className="photo-original-link"
            href="/images/certificate-presentation.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full photograph <span aria-hidden="true">↗</span>
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
