import type { Status } from "@/lib/site";

const STYLE: Record<Status, string> = {
  LIVE: "text-emerald-bright",
  PRODUCTION: "text-gold",
  "OPEN SOURCE": "text-paper-dim",
  PRIVATE: "text-paper-faint",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`text-tag inline-flex items-center gap-1.5 ${STYLE[status]}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current"
      />
      {status === "LIVE" ? "Live project" : status.toLowerCase()}
    </span>
  );
}
