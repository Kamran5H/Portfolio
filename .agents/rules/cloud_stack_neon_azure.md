# Full-Stack Cloud Integration: GitHub, Neon Postgres, Azure & Custom Domains

When building and deploying web applications connected to GitHub, Neon, and Azure:
1. **Database Resilience (Neon PostgreSQL)**:
   - Use serverless pooling via `@neondatabase/serverless` or `pg`.
   - Always implement graceful fallbacks in API routes: if `DATABASE_URL` is unset or unreachable during initial setup, return mock responses or actionable configuration advisories rather than crashing the build.
   - Provide an idempotent initialization script (`scripts/init-db.js` / `schema.sql`) to provision tables (`inquiries`, `collaborations`, `analytics`) with indexes.
2. **Cloud Resource Isolation (Azure)**:
   - Check existing Azure resource groups (`az group list`). Never deploy to or overwrite existing production service groups (e.g. `qaukalam`).
   - Provision a dedicated resource group (e.g. `kamran-portfolio-rg`) for the portfolio using Azure Static Web Apps (Free tier) with built-in GitHub Actions CI/CD and automated SSL certificates.
3. **Custom Domain Readiness**:
   - Include `staticwebapp.config.json` with security headers (CSP, HSTS), routing rules, and fallback handlers.
   - Document DNS records (Apex A/ALIAS, Subdomain CNAME, and TXT ownership validation) for instant domain connection.
