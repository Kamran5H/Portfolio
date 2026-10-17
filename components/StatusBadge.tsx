import type { Status } from '@/lib/site';

const STYLE: Record<Status, string> = {
  LIVE: 'text-emerald-bright',
  PRODUCTION: 'text-gold',
  'OPEN SOURCE': 'text-paper-dim',
  PRIVATE: 'text-paper-faint',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`meta inline-flex items-center gap-1.5 ${STYLE[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${status === 'LIVE' ? 'animate-pulse' : ''}`} />
      {status === 'LIVE' ? 'Live in production' : status.toLowerCase()}
    </span>
  );
}
