type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kamran delivered a full Amazon brand discovery pipeline in 4 days. It scrapes 3,000+ ASINs per hour, extracts brands with insane accuracy, and exports clean CSVs ready for our outreach team. Best ROI of any tool investment this year.",
    name: "Marcus T.",
    role: "Amazon FBA Aggregator · Germany",
    initials: "MT",
  },
  {
    quote:
      "I needed a custom Playwright scraper that could handle Amazon's bot detection. Kamran's solution has been running for 3 months without a single block. The stealth implementation is genuinely impressive.",
    name: "Sarah L.",
    role: "Senior Sourcing Manager · UK",
    initials: "SL",
  },
  {
    quote:
      "The brand discovery engine he built replaced our entire manual research process for this task. 94% confidence scores, parked domain detection, multi-source verification — it's exactly what enterprise-grade looks like.",
    name: "Daniel K.",
    role: "E-commerce Director · USA",
    initials: "DK",
  },
  {
    quote:
      "Turnaround was 48 hours for a fully working ASIN scraper. Documentation was clean. Code was readable. He even added features I didn't ask for that made it 10x more useful.",
    name: "Priya M.",
    role: "FBA Consultant · Canada",
    initials: "PM",
  },
  {
    quote:
      "I've hired developers from every major platform. Kamran's technical depth on Amazon scraping is in a completely different category. He understood the anti-bot landscape better than anyone I've worked with.",
    name: "James R.",
    role: "Amazon Brand Researcher · Australia",
    initials: "JR",
  },
  {
    quote:
      "The GUI desktop tool he built for our team looks like a professional product — dark mode, live progress tracking, error recovery, one-click exports. Our non-technical team uses it without any training.",
    name: "Aisha B.",
    role: "Operations Lead · UAE",
    initials: "AB",
  },
  {
    quote:
      "We gave Kamran a vague brief and he came back with a complete architecture proposal, timeline, and sample output before we even formally hired him. Hired immediately.",
    name: "Tom W.",
    role: "Amazon Agency Owner · Netherlands",
    initials: "TW",
  },
  {
    quote:
      "Three months after delivery, the pipeline is still running flawlessly with zero maintenance. Kamran built it right the first time. That's extremely rare in freelance development.",
    name: "Yuki S.",
    role: "FBA Brand Analyst · Japan",
    initials: "YS",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="bg-[var(--bg-card)] border border-[var(--border-subtle)] border-solid rounded-[12px] px-[24px] py-[22px] w-[340px] flex-shrink-0"
    >
      <div className="font-ibm text-[14px] text-[var(--accent-orange)]">★★★★★</div>
      <div className="font-body text-[15px] italic text-[var(--text-secondary)] leading-[1.7] mt-3">
        {t.quote}
      </div>
      <div className="flex gap-3 mt-4 items-center">
        <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center text-white font-mono text-[14px]">
          {t.initials}
        </div>
        <div>
          <div className="font-jetbrains text-[14px] font-bold text-[var(--text-primary)]">{t.name}</div>
          <div className="font-ibm text-[11px] text-[var(--text-muted)]">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ row, reverse }: { row: Testimonial[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {[row, row].flat().map((t, idx) => (
          <TestimonialCard key={`${t.name}-${idx}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4, 8);

  return (
    <section className="bg-[var(--bg-primary)] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// social proof</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">What Clients Say</div>
        </div>

        <div className="mt-16 space-y-6 group">
          <div className="flex flex-col gap-6">
            <MarqueeRow row={row1} reverse />
            <MarqueeRow row={row2} />
          </div>
        </div>
      </div>
    </section>
  );
}

