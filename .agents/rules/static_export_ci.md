# Static Export & CI Integrity Rules

1. **No Phantom Serverless Dependencies**:
   - If `next.config.js` sets `output: 'export'`, do not retain serverless database client packages or empty `/api` directories. Keep architecture aligned with deployment reality.
   
2. **Honest CI Quality Gates**:
   - CI workflows must run `npm run lint` and `npm run build` (or `tsc --noEmit`), never superficial JSON syntax checks that conceal compile-time failures.

3. **Honest Client Workflows in Static Export**:
   - In static export configurations (`output: 'export'`), do not simulate fake serverless processing (e.g. artificial timeout delays or "Submitting..." spinners) when no backend handler exists.
   - Use direct, honest client interactions (e.g. pre-filled `mailto:` triggers opening the user's mail client).
   - Ensure all form fields use strictly paired `<label htmlFor="id">` and `<input id="id">` attributes for screen reader accessibility.

4. **Deterministic Pre-Build & Post-Export Contracts**:
   - **Pre-Build Content Validation (`scripts/check-content.mjs`)**: Every release must run automated schema and link validation. Verify E.164 phone formats (`^\+[1-9]\d{9,14}$`), HTTPS schemes, cross-referenced project IDs, and physical presence of magic byte-validated documents (e.g. `%PDF-` header for CV).
   - **Post-Export Verification (`scripts/check-export.mjs`)**: Walk the static output directory (`out/`) to ensure hosting configurations (`staticwebapp.config.json`), sitemap, robots, exactly one `<h1>`, and every referenced internal asset exist, while asserting zero private/scratch/env files leak into public exports.
