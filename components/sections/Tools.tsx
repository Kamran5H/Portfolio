import TerminalWindow from "../ui/TerminalWindow";

const ToolBadgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const ToolLineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2v20M2 12h20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

const BADGES = [
  "Python",
  "asyncio",
  "aiohttp",
  "Playwright",
  "SQLite",
  "BeautifulSoup4",
  "lxml",
  "pandas",
  "customtkinter",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "TypeScript",
  "PostgreSQL",
  "Docker",
];

export default function Tools() {
  return (
    <section id="tools" className="bg-[var(--bg-secondary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// tools</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">
            The Stack Behind The Magic
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-12">
          {BADGES.map((b) => (
            <div
              key={b}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[8px] px-[20px] py-[12px] flex items-center gap-3 transition-all duration-200 hover:border-[var(--border-glow)] hover:text-[var(--accent-cyan)] hover:shadow-[var(--glow-cyan)]"
            >
              <span className="text-[var(--accent-cyan)]">
                <ToolBadgeIcon />
              </span>
              <span className="font-ibm text-[13px] text-[var(--text-secondary)]">{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 items-center justify-center">
          {BADGES.map((b) => (
            <div
              key={`line-${b}`}
              className="flex items-center gap-2 px-3 py-2 rounded-[8px] border border-[var(--border-subtle)] bg-[rgba(0,212,255,0.03)]"
            >
              <span className="text-[var(--accent-cyan)]">
                <ToolLineIcon />
              </span>
              <span className="font-ibm text-[13px] text-[var(--text-secondary)]">{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-[700px]">
            <TerminalWindow
              height="280px"
              typingSpeed={60}
              title="kamran@architect: ~/setup"
              lines={[
                "$ pip install playwright aiohttp beautifulsoup4 pandas customtkinter lxml",
                "Collecting playwright...",
                "Collecting aiohttp...",
                "Successfully installed:",
                "  playwright-1.43.0",
                "  aiohttp-3.9.5",
                "  beautifulsoup4-4.12.3",
                "  pandas-2.2.2",
                "  customtkinter-5.2.2",
                "  lxml-5.2.1",
                "✅ Environment ready. 6 packages installed in 4.2s.",
                "$ _",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

