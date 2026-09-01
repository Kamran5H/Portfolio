import AnimatedCounter from "../ui/AnimatedCounter";

type Stat = {
  target: number;
  suffix?: string;
  label1: string;
  label2: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { target: 2800, suffix: "+", label1: "ASINs Per Hour", label2: "At peak scraping throughput" },
  { target: 94, suffix: "%", label1: "Brand Accuracy", label2: "Extraction success rate" },
  { target: 9, suffix: "x", label1: "Faster Than Manual", label2: "Hours saved per research session" },
  { target: 120, suffix: "+", label1: "Projects Completed", label2: "Across 15+ countries" },
];

export default function Results() {
  return (
    <section id="results" className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[980px]">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// results</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">
            The Numbers That Matter
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 mt-16">
          {STATS.map((s, idx) => (
            <div
              key={s.label1}
              className={[
                "py-2",
                idx < 3 ? "md:border-r md:border-[var(--border-subtle)] md:pr-8 md:mr-2" : "",
              ].join(" ")}
            >
              <div
                className="font-mono text-[64px] font-bold text-[var(--accent-cyan)] leading-[1]"
                style={{ textShadow: "var(--glow-cyan)" }}
              >
                <AnimatedCounter target={s.target} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <div className="font-jetbrains text-[16px] text-[var(--text-primary)] mt-2 font-bold">{s.label1}</div>
              <div className="font-body text-[14px] text-[var(--text-secondary)] mt-1">{s.label2}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-y border-[var(--border-subtle)] py-4">
          <div className="font-ibm text-[13px] text-[var(--text-secondary)] flex flex-wrap gap-x-8 gap-y-2 items-center justify-center">
            <span>
              <span className="text-[var(--accent-green)]">✓</span> No manual work
            </span>
            <span>
              <span className="text-[var(--accent-green)]">✓</span> Runs overnight
            </span>
            <span>
              <span className="text-[var(--accent-green)]">✓</span> Zero duplicates
            </span>
            <span>
              <span className="text-[var(--accent-green)]">✓</span> 72hr delivery
            </span>
            <span>
              <span className="text-[var(--accent-green)]">✓</span> Fully documented
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

