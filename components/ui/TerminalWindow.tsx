"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";

type TerminalWindowProps = {
  lines: string[];
  typingSpeed?: number;
  title?: string;
  height?: string;
};

function getRestColorClassForLine(line: string) {
  if (line.startsWith("$")) return "text-[var(--accent-green)]";
  if (line.includes("❌")) return "text-[var(--error-red)]";
  if (line.includes("✅")) return "text-[var(--accent-green)]";
  if (line.includes("🚀")) return "text-[var(--accent-cyan)]";
  if (line.includes("🏁") || line.includes("📊")) return "text-[var(--text-primary)]";
  return "text-[var(--text-secondary)]";
}

function getTimestampEndIndex(line: string) {
  // Timestamp lines begin with [HH:MM:SS] — we treat only that bracket portion as muted.
  if (!line.startsWith("[")) return null;
  const closeIdx = line.indexOf("]");
  if (closeIdx === -1) return null;
  const maybeSpace = line[closeIdx + 1] === " " ? closeIdx + 2 : closeIdx + 1;
  return maybeSpace; // exclusive index within the line
}

export default function TerminalWindow({
  lines,
  typingSpeed = 30,
  title = "terminal",
  height,
}: TerminalWindowProps) {
  const fullText = useMemo(() => lines.join("\n"), [lines]);
  const [typedCount, setTypedCount] = useState(0);

  const lineStartOffsets = useMemo(() => {
    const offsets: number[] = [];
    let cur = 0;
    for (let i = 0; i < lines.length; i++) {
      offsets.push(cur);
      cur += lines[i].length;
      if (i !== lines.length - 1) cur += 1; // newline
    }
    return offsets;
  }, [lines]);

  const lineIndexForCharPos = (pos: number) => {
    // Find the latest line start offset <= pos.
    let idx = 0;
    for (let i = 0; i < lineStartOffsets.length; i++) {
      if (lineStartOffsets[i] <= pos) idx = i;
    }
    return idx;
  };

  useEffect(() => {
    setTypedCount(0);
    const textLen = fullText.length;
    if (textLen === 0) return;

    const id = window.setInterval(() => {
      setTypedCount((prev) => {
        const next = Math.min(prev + 1, textLen);
        if (next >= textLen) window.clearInterval(id);
        return next;
      });
    }, typingSpeed);

    return () => window.clearInterval(id);
  }, [fullText, typingSpeed]);

  const chars = useMemo(() => {
    const out: ReactNode[] = [];
    const shown = Math.min(typedCount, fullText.length);
    for (let i = 0; i < shown; i++) {
      const lineIdx = lineIndexForCharPos(i);
      const line = lines[lineIdx] ?? "";
      const relPos = i - lineStartOffsets[lineIdx];

      const timestampEndExclusive = getTimestampEndIndex(line);
      const isWithinTimestamp = timestampEndExclusive != null && relPos < timestampEndExclusive;
      const isTimestampLine = timestampEndExclusive != null;

      const colorClass = isWithinTimestamp
        ? "text-[var(--text-muted)]"
        : isTimestampLine
          ? "text-[var(--text-secondary)]"
          : getRestColorClassForLine(line);
      const ch = fullText[i] ?? "";

      out.push(
        <span key={i} className={colorClass}>
          {ch}
        </span>
      );
    }
    return out;
  }, [typedCount, fullText, lineStartOffsets, lines]);

  const showCursor = typedCount >= fullText.length && fullText.length > 0;

  return (
    <div
      className={clsx(
        "border border-[var(--border-glow)] rounded-[12px] overflow-hidden",
        "shadow-[var(--glow-cyan)]"
      )}
      style={{
        boxShadow: "var(--glow-cyan), inset 0 0 30px rgba(0,212,255,0.03)",
      }}
    >
      <div
        className="h-[36px] bg-[var(--terminal-title-bg)] flex items-center px-4 gap-2"
        aria-hidden="true"
      >
        <span
          className="w-[12px] h-[12px] rounded-full bg-[var(--terminal-dot-red)] shadow-[0_0_10px_rgba(255,95,87,0.15)]"
        />
        <span
          className="w-[12px] h-[12px] rounded-full bg-[var(--terminal-dot-yellow)] shadow-[0_0_10px_rgba(254,188,46,0.15)]"
        />
        <span
          className="w-[12px] h-[12px] rounded-full bg-[var(--terminal-dot-green)] shadow-[0_0_10px_rgba(40,216,64,0.15)]"
        />
        <span className="ml-1 font-ibm text-[12px] text-[var(--text-muted)] truncate">{title}</span>
      </div>

      <div
        className="bg-[var(--terminal-bg)] p-[20px] font-jetbrains text-[13px] leading-[1.8] whitespace-pre-wrap overflow-y-auto"
        style={{ maxHeight: height ?? undefined }}
      >
        <div aria-label="Terminal output">{chars}</div>
        {showCursor && (
          <span aria-hidden="true" className="text-[var(--accent-green)] animate-blink">
            {" "}
            ▋
          </span>
        )}
      </div>
    </div>
  );
}

