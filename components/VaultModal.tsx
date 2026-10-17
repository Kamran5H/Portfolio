'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE, VAULT_ITEMS, type VaultItem } from '@/lib/site';

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: VaultItem | null;
}

export default function VaultModal({ isOpen, onClose, selectedItem }: VaultModalProps) {
  const [targetId, setTargetId] = useState<string>(VAULT_ITEMS[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [purpose, setPurpose] = useState('Academic Review');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Sync targetId when selectedItem changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setTargetId(selectedItem?.id || VAULT_ITEMS[0].id);
      setSubmitted(false);
      setCopied(false);
    }
  }, [isOpen, selectedItem]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('overflow-locked');
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.classList.remove('overflow-locked');
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', trap);
    return () => window.removeEventListener('keydown', trap);
  }, [isOpen, submitted]);

  const activeItem = VAULT_ITEMS.find((v) => v.id === targetId) || VAULT_ITEMS[0];

  const getSubjectText = useCallback(() => {
    return `Confidential Document Access Request: ${activeItem.label} — ${name}`;
  }, [activeItem.label, name]);

  const getBodyText = useCallback(() => {
    return (
      `Hello Kamran,\n\nI am requesting confidential access to: ${activeItem.label} (${activeItem.group})\n\n` +
      `Requester Details:\n` +
      `- Name: ${name}\n` +
      `- Verified Email: ${email}\n` +
      `- Institution/Organization: ${institution}\n` +
      `- Stated Purpose: ${purpose}\n\n` +
      `Thank you.`
    );
  }, [activeItem.label, activeItem.group, name, email, institution, purpose]);

  const buildMailto = useCallback(() => {
    const subject = encodeURIComponent(getSubjectText());
    const body = encodeURIComponent(getBodyText());
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }, [getSubjectText, getBodyText]);

  const getGmailUrl = useCallback(() => {
    const su = encodeURIComponent(getSubjectText());
    const body = encodeURIComponent(getBodyText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}&su=${su}&body=${body}`;
  }, [getSubjectText, getBodyText]);

  const copyRequestText = async () => {
    const full = `To: ${SITE.email}\nSubject: ${getSubjectText()}\n\n${getBodyText()}`;
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildMailto();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-lg animate-[fadein_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Confidential Document Access Request"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-ink-1/80 p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 rounded-full border border-white/10 bg-ink-card/60 flex items-center justify-center text-paper-dim hover:text-white hover:border-line-hover transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/20 text-emerald-bright text-2xl border border-emerald/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="display text-2xl sm:text-3xl text-paper">Email Client Opened</h3>
            <p className="mt-3 text-sm text-paper-dim leading-relaxed">
              A pre-filled request for <strong className="text-paper">{activeItem.label}</strong> has been
              composed in your default mail client. Please review and send it.
            </p>
            <div className="mt-5 rounded-2xl border border-line bg-ink-card p-4 text-left text-xs text-paper-dim space-y-1">
              <div className="font-mono text-paper-faint uppercase text-[10px] tracking-wider mb-1">
                What Happens Next
              </div>
              <p>Verified directly by Muhammad Kamran Ashraf.</p>
              <p>Access dispatched exclusively to your verified institutional email.</p>
              <p>Documents are watermarked and not publicly downloadable.</p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={getGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald/20 border border-emerald/40 px-4 py-2.5 text-xs font-semibold text-emerald-bright hover:bg-emerald/30 transition-colors"
                >
                  <span>Compose in Gmail Web</span>
                  <span className="text-xs">↗</span>
                </a>
                <button
                  onClick={() => { window.location.href = buildMailto(); }}
                  className="flex-1 rounded-xl border border-line bg-ink-2 px-4 py-2.5 text-xs font-medium text-paper hover:bg-ink-card transition-colors"
                >
                  Open Mail App
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={copyRequestText}
                  className="flex-1 rounded-xl border border-line bg-ink-card px-4 py-2.5 text-xs font-mono text-paper-dim hover:text-paper hover:border-line-hover transition-colors"
                >
                  {copied ? '✓ Request Copied to Clipboard' : '📋 Copy Full Request Text'}
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-line bg-ink-2 px-5 py-2.5 text-xs font-medium text-paper hover:bg-ink-card transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-gold">
                Confidential Document Access
              </span>
            </div>
            <h3 className="display text-2xl sm:text-3xl text-paper">
              Request Verified Access
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-paper-dim">
              Credentials, official transcripts, and unpublished research dossiers are kept strictly confidential to protect research integrity.
            </p>

            {/* Document Selector */}
            <div className="mt-5">
              <label htmlFor="vault-target" className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1.5">
                Target Record
              </label>
              <select
                id="vault-target"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper focus:border-emerald focus:outline-none transition-colors"
              >
                {VAULT_ITEMS.map((item) => (
                  <option key={item.id} value={item.id}>
                    [{item.group}] {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label htmlFor="vault-name" className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                  Full Name
                </label>
                <input
                  id="vault-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prof. / Dr. / Researcher Name"
                  className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-emerald focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="vault-email" className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                  Institutional / Professional Email
                </label>
                <input
                  id="vault-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu or name@institution.org"
                  className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-emerald focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="vault-institution" className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                    Institution / University
                  </label>
                  <input
                    id="vault-institution"
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. QAU, Cambridge, Industry"
                    className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-emerald focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="vault-purpose" className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                    Purpose
                  </label>
                  <select
                    id="vault-purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full rounded-xl border border-line bg-ink-2 px-3 py-2 text-sm text-paper focus:border-emerald focus:outline-none transition-colors"
                  >
                    <option value="Academic Review">Academic Review</option>
                    <option value="Faculty / Graduate Admissions">Faculty / Graduate Admissions</option>
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="Verification / Employment">Verification / Employment</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald hover:bg-emerald-bright py-3 text-sm font-medium text-ink transition-colors shadow-lg shadow-emerald/20"
                >
                  Open in Mail Client
                </button>
              </div>
            </form>

            <p className="mt-3.5 text-center font-mono text-[10px] text-paper-faint">
              Opens your default email client with a pre-filled request.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
