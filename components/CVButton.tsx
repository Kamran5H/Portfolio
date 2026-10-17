import { CV } from "@/lib/site";
export default function CVButton({
  variant = "ghost",
  label = "Download CV",
}: {
  variant?: "solid" | "ghost";
  label?: string;
}) {
  return (
    <div className="cv-actions">
      <a
        href={CV.href}
        download={CV.filename}
        className={`btn ${variant === "solid" ? "btn-solid" : "btn-ghost"}`}
      >
        {label} <span aria-hidden="true">↓</span>
      </a>
      <a
        href={CV.href}
        target="_blank"
        rel="noopener noreferrer"
        className="cv-preview"
        aria-label="Preview CV (PDF, opens in a new tab)"
      >
        PDF ↗
      </a>
    </div>
  );
}
