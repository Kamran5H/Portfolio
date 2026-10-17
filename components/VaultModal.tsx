"use client";

import { useEffect, useRef, useState } from "react";
import { SITE, VAULT_ITEMS, type VaultItem } from "@/lib/site";

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: VaultItem | null;
}

export default function VaultModal({
  isOpen,
  onClose,
  selectedItem,
}: VaultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [targetId, setTargetId] = useState(
    selectedItem?.id || VAULT_ITEMS[0].id,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [purpose, setPurpose] = useState("Research Collaboration");
  const [prepared, setPrepared] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, [isOpen, selectedItem]);

  const item = VAULT_ITEMS.find((v) => v.id === targetId) || VAULT_ITEMS[0];
  const subject = `Document / research enquiry: ${item.label} — ${name.trim()}`;
  const body = `Hello Kamran,\n\nI would like to discuss or request: ${item.label}.\n\nName: ${name.trim()}\nReply email: ${email.trim()}\nInstitution / organisation: ${institution.trim()}\nPurpose: ${purpose}\n\nPlease let me know what information can be shared.\n\nThank you.`;
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${SITE.email}\nSubject: ${subject}\n\n${body}`,
      );
      setNotice("Request text copied. Paste it into your email application.");
    } catch {
      setNotice(`Clipboard unavailable. You can email ${SITE.email} directly.`);
    }
  };
  return (
    <dialog
      ref={dialogRef}
      className="request-dialog"
      aria-labelledby="request-title"
      aria-describedby="request-description"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close document request"
      >
        ×
      </button>
      <p className="eyebrow">Research &amp; supporting documents</p>
      <h2 id="request-title" className="display">
        {prepared ? "Your request is ready." : "Start an enquiry."}
      </h2>
      <p id="request-description">
        {prepared
          ? "We attempted to open your email application. Review and send the message there. Nothing has been sent by this website."
          : "Prepare an email to Kamran for academic review, employment verification, or research discussion. Availability is reviewed individually."}
      </p>
      {!prepared ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPrepared(true);
            window.location.href = mailto;
          }}
        >
          <label htmlFor="vault-target">Document or project</label>
          <select
            id="vault-target"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            {VAULT_ITEMS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
          <label htmlFor="vault-name">Full name</label>
          <input
            autoComplete="name"
            id="vault-name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="vault-email">Reply email</label>
          <input
            autoComplete="email"
            id="vault-email"
            type="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="vault-institution">Institution or organisation</label>
          <input
            autoComplete="organization"
            id="vault-institution"
            required
            maxLength={160}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
          <label htmlFor="vault-purpose">Purpose</label>
          <select
            id="vault-purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            {[
              "Research Collaboration",
              "Graduate Admissions",
              "Academic Review",
              "Employment Verification",
              "Software Discussion",
            ].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-emerald">
            Prepare email request ↗
          </button>
          <p className="dialog-note">
            Your details stay in this browser until you send the email. This
            form does not verify identity or grant document access.
          </p>
        </form>
      ) : (
        <div className="prepared-actions">
          <a
            className="btn btn-emerald"
            href={gmail}
            target="_blank"
            rel="noopener noreferrer"
          >
            Compose in Gmail ↗
          </a>
          <a className="btn btn-ghost" href={mailto}>
            Open email application
          </a>
          <button className="btn btn-ghost" onClick={copy}>
            Copy request text
          </button>
          <button className="text-link" onClick={() => setPrepared(false)}>
            Edit request
          </button>
        </div>
      )}
      <p className="dialog-notice" role="status">
        {notice}
      </p>
      <p className="dialog-direct">
        Prefer a direct email? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </dialog>
  );
}
