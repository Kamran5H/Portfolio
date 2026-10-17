"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL, SOCIALS } from "@/lib/site";
import CVButton from "./CVButton";

export default function Contact() {
  const [message, setMessage] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setMessage("Email address copied.");
    } catch {
      setMessage(
        `Copy unavailable. Please use the email link or select ${EMAIL}.`,
      );
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setMessage(""), 4000);
  };
  return (
    <footer id="contact" className="section-shell contact-section">
      <div className="contact-top">
        <div>
          <p className="eyebrow">05 / Get in touch</p>
          <h2 className="display">
            Let’s move good
            <br />
            <em>questions forward.</em>
          </h2>
        </div>
        <div className="contact-context">
          <p>
            For research opportunities, graduate study, scientific software, or
            a project worth discussing.
          </p>
          <p>Based in Islamabad, Pakistan.</p>
        </div>
      </div>
      <a className="contact-email display" href={`mailto:${EMAIL}`}>
        {EMAIL}
        <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-actions">
        <a
          className="btn btn-emerald"
          href={`mailto:${EMAIL}?subject=${encodeURIComponent("Research / collaboration enquiry")}`}
        >
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
        <button className="btn btn-ghost" onClick={copy}>
          Copy email
        </button>
        <CVButton />
      </div>
      <p className="copy-status" role="status">
        {message}
      </p>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Muhammad Kamran Ashraf</p>
        <nav aria-label="Professional profiles">
          {SOCIALS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
