# Static Export & CI Integrity Rules

1. **No Phantom Serverless Dependencies**:
   - If `next.config.js` sets `output: 'export'`, do not retain serverless database client packages or empty `/api` directories. Keep architecture aligned with deployment reality.
   
2. **Honest CI Quality Gates**:
   - CI workflows must run `npm run lint` and `npm run build` (or `tsc --noEmit`), never superficial JSON syntax checks that conceal compile-time failures.

3. **Honest Client Workflows in Static Export**:
   - In static export configurations (`output: 'export'`), do not simulate fake serverless processing (e.g. artificial timeout delays or "Submitting..." spinners) when no backend handler exists.
   - Use direct, honest client interactions (e.g. pre-filled `mailto:` triggers opening the user's mail client).
   - Ensure all form fields use strictly paired `<label htmlFor="id">` and `<input id="id">` attributes for screen reader accessibility.
