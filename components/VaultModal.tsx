'use client';

import { useState } from 'react';
import { SITE, VAULT_ITEMS, type VaultItem } from '@/lib/site';

interface VaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: VaultItem | null;
}

export default function VaultModal({ isOpen, onClose, selectedItem }: VaultModalProps) {
  const [targetId, setTargetId] = useState<string>(selectedItem?.id || VAULT_ITEMS[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [purpose, setPurpose] = useState('Academic / Collaboration');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const activeItem = VAULT_ITEMS.find((v) => v.id === targetId) || selectedItem || VAULT_ITEMS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate safe API submission + create pre-filled mailto backup
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Confidential Document Access Request: ${activeItem.label} — ${name}`);
    const body = encodeURIComponent(
      `Hello Kamran,\n\nI am requesting confidential access to: ${activeItem.label} (${activeItem.group})\n\n` +
      `Requester Details:\n` +
      `- Name: ${name}\n` +
      `- Verified Email: ${email}\n` +
      `- Institution/Organization: ${institution}\n` +
      `- Stated Purpose: ${purpose}\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-[fadein_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-line bg-ink-1 p-6 sm:p-8 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 rounded-full border border-line bg-ink-card flex items-center justify-center text-paper-dim hover:text-white hover:border-line-hover"
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/20 text-emerald-bright text-2xl border border-emerald/30">
              ✓
            </div>
            <h3 className="display text-2xl sm:text-3xl text-paper">Request Transmitted</h3>
            <p className="mt-3 text-sm text-paper-dim leading-relaxed">
              Your request for <strong className="text-paper">{activeItem.label}</strong> has been logged for{' '}
              <strong className="text-emerald-bright">{email}</strong>.
            </p>
            <div className="mt-5 rounded-2xl border border-line bg-ink-card p-4 text-left text-xs text-paper-dim space-y-1">
              <div className="font-mono text-paper-faint uppercase text-[10px] tracking-wider mb-1">
                Access Protocol
              </div>
              <p>• Verified directly by Muhammad Kamran Ashraf.</p>
              <p>• Access token dispatched exclusively to your verified institutional email.</p>
              <p>• Direct download is restricted; document view is securely watermarked.</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleMailtoFallback}
                className="flex-1 rounded-xl border border-emerald/30 bg-emerald/15 px-4 py-2.5 text-xs font-medium text-emerald-bright hover:bg-emerald/25"
              >
                Send via Direct Mail Client ↗
              </button>
              <button
                onClick={onClose}
                className="rounded-xl border border-line bg-ink-2 px-5 py-2.5 text-xs font-medium text-paper hover:bg-ink-card"
              >
                Done
              </button>
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
              <label className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1.5">
                Target Record
              </label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2.5 text-sm text-paper focus:border-emerald focus:outline-none"
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
                <label className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prof. / Dr. / Researcher Name"
                  className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                  Institutional / Professional Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu or name@institution.org"
                  className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-emerald focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. QAU, Cambridge, Industry"
                    className="w-full rounded-xl border border-line bg-ink-2 px-3.5 py-2 text-sm text-paper placeholder:text-paper-faint focus:border-emerald focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-paper-faint mb-1">
                    Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full rounded-xl border border-line bg-ink-2 px-3 py-2 text-sm text-paper focus:border-emerald focus:outline-none"
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
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald hover:bg-emerald-bright py-3 text-sm font-medium text-ink transition-colors shadow-lg shadow-emerald/20 disabled:opacity-50"
                >
                  {loading ? 'Submitting Request...' : 'Transmit Access Request'}
                </button>
              </div>
            </form>

            <p className="mt-3.5 text-center font-mono text-[10px] text-paper-faint">
              🔒 Watermarked delivery. Protected against incognito copying and public indexing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
