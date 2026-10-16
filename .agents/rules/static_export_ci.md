# Static Export & CI Integrity Rules

1. **No Phantom Serverless Dependencies**:
   - If `next.config.js` sets `output: 'export'`, do not retain serverless database client packages or empty `/api` directories. Keep architecture aligned with deployment reality.
   
2. **Honest CI Quality Gates**:
   - CI workflows must run `npm run lint` and `npm run build` (or `tsc --noEmit`), never superficial JSON syntax checks that conceal compile-time failures.
