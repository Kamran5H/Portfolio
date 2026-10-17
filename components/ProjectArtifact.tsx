"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { ARTIFACTS, type ProjectArtifact as Artifact } from "@/lib/site";

/** Lightweight, original vector studies. No remote app is embedded or simulated. */
export function ArtifactGraphic({
  kind,
  step = 0,
}: {
  kind: string;
  step?: number;
}) {
  const document = ["papers", "document", "mail", "code", "type"].includes(
    kind,
  );
  const network = ["molecule", "compare", "community"].includes(kind);
  const media = kind === "media";
  return (
    <svg
      viewBox="0 0 360 150"
      fill="none"
      aria-hidden="true"
      className={`artifact-graphic graphic-${kind}`}
    >
      <path d="M18 130H342M18 20H342" className="graphic-rule" />
      {document ? (
        <>
          <path d="M105 34h144v95H105z" className="graphic-sheet-back" />
          <path d="M95 24h144v95H95z" className="graphic-sheet" />
          {kind === "code" ? (
            <path
              d="m139 49-13 13 13 13m41-26 13 13-13 13m-18-31-10 39"
              className="graphic-stroke"
            />
          ) : kind === "type" ? (
            <text
              x="166"
              y="77"
              textAnchor="middle"
              className="graphic-urdu"
              lang="ur"
            >
              خیال
            </text>
          ) : (
            <>
              <path
                d="M114 44h72M114 56h105M114 68h92M114 80h105"
                className="graphic-stroke"
              />
              <path d="M114 95h43" className="graphic-accent" />
            </>
          )}
          <circle cx={263 + step * 9} cy="52" r="18" className="graphic-disc" />
          <path d="m257 52 4 4 8-9" className="graphic-stroke" />
        </>
      ) : network ? (
        <>
          <path
            d="M80 76 154 38 225 76 154 117 80 76Zm74-38v79m71-41 57-40m-57 40 57 42"
            className="graphic-stroke"
          />
          {[
            [80, 76],
            [154, 38],
            [225, 76],
            [154, 117],
            [282, 36],
            [282, 118],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === step ? 14 : 9}
              className={i === step ? "graphic-active-node" : "graphic-node"}
            />
          ))}
        </>
      ) : media ? (
        <>
          {[64, 145, 226].map((x, i) => (
            <g key={x}>
              <rect
                x={x}
                y="32"
                width="70"
                height="65"
                rx="3"
                className={i === step ? "graphic-sheet" : "graphic-sheet-back"}
              />
              <path
                d={`m${x + 10} 84 17-18 12 11 13-21 12 28`}
                className="graphic-stroke"
              />
              <circle cx={x + 20} cy="48" r="5" className="graphic-disc" />
            </g>
          ))}
          <path d="M64 117h232" className="graphic-stroke" />
          <circle
            cx={99 + step * 81}
            cy="117"
            r="6"
            className="graphic-active-node"
          />
        </>
      ) : (
        <>
          <rect
            x="65"
            y="28"
            width="230"
            height="96"
            rx="4"
            className="graphic-sheet"
          />
          <path d="M65 47h230M111 47v77" className="graphic-rule" />
          {[64, 84, 104].map((y, i) => (
            <g key={y}>
              <rect
                x="80"
                y={y - 6}
                width="12"
                height="12"
                rx="2"
                className={i === step ? "graphic-active-node" : "graphic-node"}
              />
              <path
                d={`M128 ${y}h${[120, 87, 104][i]}`}
                className="graphic-stroke"
              />
              {kind === "chart" && (
                <rect
                  x="128"
                  y={y - 5}
                  width={[125, 78, 103][i]}
                  height="10"
                  className="graphic-disc"
                />
              )}
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export function ArtifactThumbnail({
  projectId,
  name,
  onOpen,
}: {
  projectId: string;
  name: string;
  onOpen: () => void;
}) {
  const artifact = ARTIFACTS.find((a) => a.id === projectId)!;
  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 8}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 10}deg`);
  };
  return (
    <button
      className="artifact-thumbnail"
      onClick={onOpen}
      onPointerMove={tilt}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg");
        event.currentTarget.style.setProperty("--tilt-y", "0deg");
      }}
      aria-label={`Explore ${name} preview`}
      aria-haspopup="dialog"
    >
      <ArtifactGraphic kind={artifact.kind} />
      <span className="artifact-thumbnail-caption">
        <span>{artifact.label}</span>
        <span aria-hidden="true">↗</span>
      </span>
      <span className="artifact-thumbnail-note">
        Explore workflow · illustrative preview
      </span>
    </button>
  );
}

export default function ProjectArtifact({ projectId }: { projectId: string }) {
  const artifact = ARTIFACTS.find((a) => a.id === projectId)!;
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const panelId = useId();
  const stage = artifact.stages[step];
  const mode = stage.mode || artifact.kind;
  return (
    <div className="project-artifact" data-artifact={projectId}>
      <div className="artifact-heading">
        <span className="artifact-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Interactive workflow study</span>
      </div>
      <ArtifactGraphic kind={mode} step={step} />
      <div
        className="artifact-stage-buttons"
        role="group"
        aria-label={`${artifact.label} stages`}
      >
        {artifact.stages.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStep(i)}
            aria-pressed={step === i}
            aria-controls={panelId}
          >
            <span aria-hidden="true">0{i + 1}</span> {s.label}
          </button>
        ))}
      </div>
      <div
        id={panelId}
        className="artifact-panel"
        aria-live="polite"
        aria-atomic="true"
      >
        <h4>{stage.title}</h4>
        <p>{stage.detail}</p>
        {mode === "code" ? (
          <pre className="artifact-code">
            <code>{stage.items.join("\n")}</code>
          </pre>
        ) : mode === "type" ? (
          <div className="artifact-type">
            <p lang="ur" dir="rtl" className="font-urdu">
              {stage.items[0]}
            </p>
            <small>
              {stage.items[1]} · {stage.items[2]}
            </small>
          </div>
        ) : (
          <ul className={`artifact-sample sample-${mode}`}>
            {stage.items.map((item, i) => (
              <li key={item}>
                {mode === "checklist" ? (
                  <label>
                    <input
                      type="checkbox"
                      checked={checked.includes(`${step}-${i}`)}
                      onChange={(e) =>
                        setChecked(
                          e.target.checked
                            ? [...checked, `${step}-${i}`]
                            : checked.filter((k) => k !== `${step}-${i}`),
                        )
                      }
                    />
                    <span>{item}</span>
                  </label>
                ) : (
                  <>
                    <span className="sample-index" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="artifact-disclaimer">{artifact.note}</p>
      <a
        className="artifact-download"
        href={`/artifacts/${artifact.id}.svg`}
        download={`${artifact.id}-workflow.svg`}
      >
        Save workflow sheet <span aria-hidden="true">↓</span>
        <span className="sr-only"> (SVG)</span>
      </a>
    </div>
  );
}

export function ArtifactDialog({
  artifact,
  name,
  href,
  onClose,
}: {
  artifact: Artifact;
  name: string;
  href?: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="artifact-dialog"
      aria-labelledby={id}
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
      <div className="artifact-dialog-heading">
        <div>
          <span className="eyebrow">Project notebook / {artifact.kind}</span>
          <h2 id={id} className="display">
            {name}
          </h2>
        </div>
        <button
          className="artifact-close"
          onClick={onClose}
          aria-label="Close project preview"
        >
          ×
        </button>
      </div>
      <ProjectArtifact projectId={artifact.id} />
      {href && (
        <a
          className="btn btn-ghost artifact-source"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore the real project <span aria-hidden="true">↗</span>
        </a>
      )}
    </dialog>
  );
}
