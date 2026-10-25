# Muhammad Kamran Ashraf

Physical chemistry research and scientific software portfolio.

Production: [kamranashraf.is-a.dev](https://kamranashraf.is-a.dev)

The portfolio introduces Kamran's MPhil work at Quaid-i-Azam University, selected software, academic and teaching background, and a public CV. The current MPhil topic is Ce-doped NiCo-MOF electrocatalysis, confirmed by the owner on 18 October 2026.

## Development

Use Node.js 24 LTS and npm. Dependencies are locked in package-lock.json.

```sh
npm ci
npm run dev
```

## Production checks and preview

```sh
npm run lint
npm test
npm run build
npm start
```

The build validates content, runs Next.js compilation and TypeScript checks, generates static files in out/, and checks navigation, metadata, local assets, the CV, the 404 page, and Azure configuration. npm start serves that exact export at http://127.0.0.1:3100. Set PORT to choose another port. npm run typecheck is available independently.

## Content

- content/site.json: identity, contact, professional profiles, education/teaching timeline, and toolkit.
- content/research.json: current research, previous projects, and research interests.
- content/projects.json: selected software case studies and public evidence links.
- content/lab.json: the wider searchable software collection.
- content/vault.json: document and private-project request options.

Use npm run content:check after editing. The validator rejects missing fields, unsafe URLs, duplicate IDs, missing CV files, and broken request references. Do not add performance metrics without dated measurement evidence. Do not describe research as published, accepted, or under review without owner confirmation and a supporting record.

The page renders its main content and case studies as static HTML. Search and request preparation use client JavaScript. The optional Three.js schematic loads only when expanded and remains still until the visitor starts animation. Rendering pauses offscreen and when the tab is hidden. It is an illustration, not simulation output.

## Public CV

The public CV is public/cv/KAMRAN-ASHRAF-CV.pdf. Rebuild it with scripts/generate_cv.py using Python with ReportLab and Pillow, then render and visually inspect both pages before publishing. The source currently uses Windows Calibri, with a Helvetica fallback elsewhere.

The prior editable DOCX and prior PDF were archived locally under ignored scratch/original-cv/. The public site serves only the revised PDF. Archived files remain in Git history; this update does not rewrite history.

## Requests and privacy

The document request dialog prepares an email; it does not send messages, authenticate a visitor, verify email, or unlock documents. The visitor sends the message using their chosen email application. Details are held in component memory and are not stored by this site. Documents are reviewed and shared manually.

Never place transcripts, identity documents, private research coordinates, credentials, or environment files in public/. Everything in public/ is exported. Keep local staging in ignored private_upload/ or scratch/.

## Deployment

GitHub Actions builds and deploys the static export to the existing Azure Static Web App after pushes to main. Both CI and the deploy workflow use Node 24, npm ci, lint, and the full build checks. The Azure job uploads the already-verified out/ directory, with no server-side Next.js runtime.

The existing repository secret AZURE_STATIC_WEB_APPS_API_TOKEN is required. No new Azure resource or hosting service is needed. The domain is configured in content/site.json; NEXT_PUBLIC_SITE_URL can override build metadata. Keep both aligned if the canonical domain changes.

staticwebapp.config.json supplies security headers, MIME types, and a real 404 response. Inline scripts/styles remain allowed for Next.js hydration and generated styling; the CSP also permits the Urdu font stylesheet from Google Fonts.

See docs/portfolio-review.md for the overhaul record and remaining maintenance considerations.

---

<div align="center">

<a href="https://github.com/Kamran5H">
  <img src="https://raw.githubusercontent.com/Kamran5H/Kamran5H/main/assets/kamran-developer-badge.png" width="85" height="85" style="border-radius: 50%; border: 2px solid #00F2FE; box-shadow: 0 4px 14px rgba(0,0,0,0.18);" alt="Developer: Kamran Ashraf" />
</a>

<br/>

### 👨‍💻 **Developer:** [Kamran Ashraf](https://github.com/Kamran5H)
*AI Systems Architect • Computational Physical Chemist • Automation Pioneer*

[![Developer Profile](https://img.shields.io/badge/GitHub-Kamran5H-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Kamran5H)
[![Developer Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Website-00F2FE?style=flat-square&logo=vercel&logoColor=black)](https://kamran5h.github.io/Portfolio/)
[![Contact Email](https://img.shields.io/badge/Email-chkamran32b%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:chkamran32b@gmail.com)

</div>

