import clsx from "clsx";
import type { ElementType } from "react";

type As = "h1" | "h2" | "span";

type GlitchTextProps = {
  text: string;
  className?: string;
  as?: As;
};

export default function GlitchText({ text, className, as = "h1" }: GlitchTextProps) {
  const Tag = as as unknown as ElementType;

  return (
    <Tag
      data-text={text}
      className={clsx(
        "relative inline-block",
        "before:content-[attr(data-text)] before:absolute before:inset-0 before:pointer-events-none",
        "after:content-[attr(data-text)] after:absolute after:inset-0 after:pointer-events-none",
        "before:text-[var(--accent-cyan)] after:text-[var(--accent-green)]",
        "before:animate-[glitch1_3s_infinite] after:animate-[glitch2_3s_infinite]",
        className
      )}
    >
      {text}
    </Tag>
  );
}

