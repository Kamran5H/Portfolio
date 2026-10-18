---
name: static-export-contract-validation
description: Automates pre-build and post-export static validation contracts for Next.js static exports, ensuring link safety, schema conformance, asset existence, and leak prevention.
---

# Static Export Contract Validation Skill

This skill provides an automated workflow to guarantee static site integrity before and after static export (`output: "export"`).

## Workflow Steps

### Step 1: Pre-Build Content & Link Validation
Before invoking the compiler or bundler, execute a content validation script (`node scripts/check-content.mjs`):
1. **Schema Integrity**:
   - Verify all required fields in content catalogs (`content/*.json`) are non-empty strings.
   - Assert all IDs conform to `^[a-z0-9-]+$` and are unique across arrays.
   - Enforce international E.164 phone formats (`^\+[1-9]\d{9,14}$`).
   - Validate that external links use HTTPS protocols.
2. **Cross-Referencing**:
   - Ensure every featured project and lab repository has a corresponding artifact entry.
   - Ensure every research card points to a valid document request target ID (`vaultTargetId`).
3. **Asset Verification**:
   - Check that referenced public binary documents (e.g. CV PDF) physically exist on disk.
   - Verify binary headers (e.g. magic byte check `%PDF-` at byte offset 0).

### Step 2: Artifact & Asset Generation
Generate static SVG or image assets from structured data before building:
- Run `node scripts/generate-artifacts.mjs` to produce self-contained, downloadable SVG workflow sheets with embedded metadata.

### Step 3: Production Build
Execute the static export:
- Run `next build` (with fallback flags if needed for platform-specific binary constraints).

### Step 4: Post-Export Verification
Walk the output directory (`out/`) and assert export completeness (`node scripts/check-export.mjs`):
1. **Mandatory Files**:
   - Verify presence of `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, and hosting config (`staticwebapp.config.json`).
2. **Structural Invariants**:
   - Verify home page contains exactly one `<h1>` element.
   - Verify all internal anchor link targets (`id="top"`, `id="research"`, etc.) exist in the compiled HTML.
   - Verify search metadata (`rel="canonical"` and `application/ld+json`) is embedded.
3. **Link & Asset Resolution**:
   - Parse all `href` and `src` attributes pointing to internal root-relative paths (`/...`).
   - Confirm each referenced file exists in `out/` (as a direct file, `.html`, or `index.html` directory).
4. **Data Leak Prevention**:
   - Assert that no staging, scratch, git, or environment files (`.env*`, `scratch/`, `.git/`, `private_upload/`) leaked into `out/`.
