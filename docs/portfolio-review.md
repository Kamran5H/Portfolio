# Portfolio review

Review date: 18 October 2026. Scope: professional positioning, factual consistency, design, accessibility, performance, static delivery, and deployment.

## Positioning and content

The original page placed five large software showcases before the academic narrative. It contained unsupported claims including a 500-user community, sub-45ms queries, a 30% abandonment improvement, and a 95% PDF retrieval rate. These claims were removed. The new selected work leads with a research tool, then a university platform and an offline planner, with sources and implementation tradeoffs.

The owner confirmed Ce-doped NiCo-MOF electrocatalysis as the current MPhil topic. The research section distinguishes current research, computational work, zinc-air literature interests, and previous undergraduate oxide/sensing projects. No publication or submission status is asserted.

The public CV now covers current research, selected software, teaching, and relevant recognition. It avoids public phone numbers and hostel location. Education entries use completion years from the supplied CV rather than inferring programme durations from overlapping records.

The wider project collection preserves access to the broader work through category filtering, text search, a compact initial view, and an explicit expand control. Personal social channels were removed from the professional footer; GitHub, LinkedIn, and ORCID remain.

## Design and accessibility

The redesign keeps the navy palette, Urdu signature, and optional chemistry schematic. It adds a real portrait, more legible type, restrained accents, clear content hierarchy, consistent action styles, and responsive layouts.

The page includes a skip link, a single H1, semantic sections, native disclosure elements, labelled inputs, a native modal dialog, focus restoration, Escape dismissal, mobile navigation focus handling, and copy-status announcements. Contact and PDF links work without client JavaScript. Content is visible before hydration; there are no reveal effects that hide it.

## Performance and maintainability

Removed the full-page Three.js stage, fabricated interactive project mockups, unused animation hooks, and React Three Fiber/Drei dependencies. The main page and static components are server-rendered into the export. The only 3D scene is lazy-loaded on expansion, starts paused, stops when hidden/offscreen, disposes resources, and handles context loss/restoration or unavailable WebGL.

The portrait uses a 45KB WebP in place of the 259KB PNG. The social preview was refreshed. Duplicate favicon routing was fixed.

Next.js and React were upgraded to current verified stable versions. ESLint uses its standalone flat configuration. JSON syntax-only validation was replaced with field, link, ID, resource, and cross-reference checks. Static export validation verifies navigation and local assets.

## Deployment

The Azure workflow now installs, lints, builds, and validates before uploading the exact static output. The hosting configuration is copied into that output. A true 404 response replaces the catch-all home-page rewrite. Deployment remains on the existing domain and Azure app.

## Release validation

The final production export passes compilation, TypeScript, content validation, and local-asset checks. ESLint reports no errors or warnings. All five content-contract regression tests pass, and Prettier checks pass.

Browser checks covered 320px mobile, 768px tablet, and 1440px desktop layouts; no horizontal overflow was observed. The portrait loaded successfully. Checked document target selection, native modal focus, Escape dismissal and focus restoration, mobile menu scroll locking and background isolation, case-study expansion, software category filtering and empty search results. The optional schematic loaded, animated on request, and removed its canvas on collapse. No browser errors were reported during these checks.

The preview returns HTTP 200 for the home page and public CV, application/pdf for the CV, and HTTP 404 for an unknown path. All 19 linked public GitHub repositories were found in the owner's public repository inventory. Both the portfolio domain and QAU Kalam responded with HTTP 200 over HTTPS.

## Ongoing maintenance

Production dependency audit after the upgrade: zero known vulnerabilities. The full dependency audit still reports nine advisories in build/lint tooling, including glob-matching dependencies used by Tailwind 3 and the current Next.js ESLint configuration. These tools are not included in the published static files. Do not claim the entire development dependency tree is vulnerability-free; review upstream fixes before future builds.

The local Windows application-control policy blocks the newly installed native SWC module. Builds use the supported Webpack and WebAssembly fallback; no system protection was changed. CI runs the same Webpack build on Linux.

Research progress, opportunity preferences, and external project availability require periodic owner review. Add DOI or repository links for future public results. Add project measurements only with a recorded method, baseline, and date. The optional schematic remains conceptual and must not be relabelled as a refined structure.

The GitHub profile is outside this repository and still needs the owner to align its current research description with the confirmed MPhil topic. This overhaul did not modify other repositories or send any messages.

The form prepares email and has no backend. Supporting documents stay off the public export. CSP allows inline code for static Next.js hydration; a stricter hash-based policy would require regenerating hashes for every deployment.
