"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL, SOCIALS, CONTACT_CHANNELS } from "@/lib/site";
import CVButton from "./CVButton";

export default function Contact() {
  const [message, setMessage] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(`${label} copied.`);
    } catch {
      setMessage(`Copy unavailable. Please select and copy ${value}.`);
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
        <button
          className="btn btn-ghost"
          onClick={() => copy(EMAIL, "Email address")}
        >
          Copy email
        </button>
        <CVButton />
      </div>
      <p className="copy-status" role="status">
        {message}
      </p>
      <div
        className="contact-channels"
        role="group"
        aria-label="Messaging contacts"
      >
        <a
          className="contact-channel"
          href={`https://wa.me/${CONTACT_CHANNELS.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="eyebrow">WhatsApp</span>
          <span className="contact-channel-value">
            {CONTACT_CHANNELS.whatsapp}
          </span>
          <span className="contact-channel-action">
            Open conversation <span aria-hidden="true">↗</span>
          </span>
        </a>
        <div className="contact-channel">
          <span className="eyebrow">WeChat</span>
          <span className="contact-channel-value">
            {CONTACT_CHANNELS.wechat}
          </span>
          <button
            className="contact-channel-action"
            onClick={() => copy(CONTACT_CHANNELS.wechat, "WeChat ID")}
          >
            Copy WeChat ID <span aria-hidden="true">⧉</span>
          </button>
        </div>
      </div>
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
