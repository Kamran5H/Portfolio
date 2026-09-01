import GlitchText from "../ui/GlitchText";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C6.48 2 2 6.58 2 12.22c0 4.43 2.87 8.18 6.84 9.51.5.1.68-.22.68-.48 0-.24-.01-.86-.01-1.69-2.78.62-3.36-1.37-3.36-1.37-.45-1.16-1.11-1.47-1.11-1.47-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.04a9.2 9.2 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.9-1.31 2.75-1.04 2.75-1.04.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.91-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.58.69.48A10.04 10.04 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.94 6.5C6.94 7.54 6.1 8.38 5.06 8.38C4.02 8.38 3.18 7.54 3.18 6.5C3.18 5.46 4.02 4.62 5.06 4.62C6.1 4.62 6.94 5.46 6.94 6.5ZM3.5 20.5H6.62V9H3.5V20.5ZM9.22 9H12.2V10.57H12.24C12.66 9.8 13.7 8.82 15.2 8.82C18.42 8.82 19.5 10.9 19.5 14.02V20.5H16.38V14.66C16.38 13.28 16.35 11.48 14.46 11.48C12.55 11.48 12.24 13 12.24 14.53V20.5H9.22V9Z"
      fill="currentColor"
    />
  </svg>
);

const UpworkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.2 7.02c.2 0 .35.17.35.37 0 .12-.06.24-.15.31l-3.3 3.3 3.3 3.3c.1.07.15.18.15.31 0 .2-.15.37-.35.37H15c-.12 0-.24-.06-.31-.15l-2.69-2.7-2.7 2.7c-.07.1-.18.15-.31.15H6.8c-.2 0-.37-.17-.37-.37 0-.13.06-.24.15-.31l3.3-3.3-3.3-3.3c-.1-.07-.15-.18-.15-.31 0-.2.17-.37.37-.37h2.2c.12 0 .24.06.31.15l2.7 2.7 2.69-2.7c.07-.1.19-.15.31-.15h2.2Z"
      fill="currentColor"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <div
                className={[
                  "w-[36px] h-[36px] rounded-[4px]",
                  "border border-[var(--accent-cyan)] bg-[rgba(0,212,255,0.08)]",
                  "flex items-center justify-center",
                  "font-mono font-bold text-[16px] text-[var(--accent-cyan)]",
                ].join(" ")}
              >
                [KA]
              </div>
              <div>
                <div className="font-mono font-bold text-[16px] text-[var(--text-primary)]">Kamran Ashraf</div>
                <div className="font-ibm text-[11px] text-[var(--text-muted)] mt-1">
                  Amazon Automation Architect
                </div>
                <div className="font-body text-[14px] text-[var(--text-muted)] mt-2">
                  Building tools that actually work.
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/"
                aria-label="GitHub"
                className="w-[36px] h-[36px] rounded-[10px] border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center transition-colors duration-200 hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                className="w-[36px] h-[36px] rounded-[10px] border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center transition-colors duration-200 hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.upwork.com/"
                aria-label="Upwork"
                className="w-[36px] h-[36px] rounded-[10px] border border-[var(--border-subtle)] text-[var(--text-muted)] flex items-center justify-center transition-colors duration-200 hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]"
              >
                <UpworkIcon />
              </a>
            </div>
          </div>

          <div>
            <div className="font-ibm uppercase text-[11px] text-[var(--accent-cyan)] mb-4">QUICK LINKS</div>
            <div className="font-ibm text-[13px] text-[var(--text-muted)]">
              {[
                { id: "services", label: "Services" },
                { id: "about", label: "About" },
                { id: "process", label: "Process" },
                { id: "tools", label: "Tools" },
                { id: "results", label: "Results" },
                { id: "contact", label: "Contact" },
              ].map((l) => (
                <div key={l.id} className="py-1">
                  <a
                    href={`#${l.id}`}
                    className="transition-colors duration-200 hover:text-[var(--text-primary)]"
                  >
                    {l.label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-ibm uppercase text-[11px] text-[var(--accent-cyan)] mb-4">BUILT WITH</div>
            <div className="font-ibm text-[12px] text-[var(--text-muted)]">Next.js · Tailwind CSS</div>
            <div className="font-ibm text-[12px] text-[var(--text-muted)] mt-2">
              Framer Motion · TypeScript
            </div>
            <div className="font-ibm text-[12px] text-[var(--text-muted)] mt-2">Hosted on Vercel</div>
            <div className="mt-4 font-ibm text-[12px] text-[var(--text-muted)]">
              Email:{" "}
              <a
                href="mailto:hello@kamranashraf.com"
                className="text-[var(--accent-cyan)] hover:shadow-[var(--glow-cyan)] transition-shadow duration-200"
              >
                hello@kamranashraf.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] mt-8 pt-6 flex items-center justify-between flex-wrap gap-4">
          <div className="font-ibm text-[11px] text-[var(--text-muted)]">
            © 2025 Kamran Ashraf. All rights reserved.
          </div>
          <div className="font-ibm text-[11px] text-[var(--text-muted)]">
            Crafted with precision. Powered by{" "}
            <GlitchText text="caffeine" as="span" className="opacity-60" />
            .
          </div>
        </div>
      </div>
    </footer>
  );
}

