# Master Execution Prompt: Complete Portfolio Audit, De-AI Humanization & Interactive Visual Overhaul

Copy and paste the prompt below directly into **Claude Code (Opus)**. It is structured specifically for an autonomous CLI coding agent with access to your codebase, assets, and Git/GitHub environment.

---

## Prompt to Paste into Claude Code

Act as a Principal Design Engineer, Creative Technologist, and Senior Full-Stack Architect (with the craft standards of Linear, Vercel, Rauno Freiberg, and Paco Coursey). 

I want you to **deeply audit, scrutinize, refactor, and completely elevate my developer portfolio codebase from top to bottom**. Right now, the portfolio looks and feels overly AI-generated ("AI slop"), repetitive, text-heavy, and rushed. Your mission is to transform it into an **authentic, human-crafted, highly interactive, graphics-first engineering showcase** that looks like it was meticulously built by an elite product builder.

Do not rush. Work methodically through every phase below, inspecting every file, component, style rule, asset, and route in this repository before making changes.

### Phase 1: Deep Codebase Scrutiny & Full Inventory Audit

1. **Map the Entire Repository**:
   - Inspect the directory tree, package dependencies (`package.json`), styling system (Tailwind, CSS modules, Framer Motion, Three.js / WebGL / GSAP / Lenis, etc.), routing structure, and asset directories (`public/`, `assets/`, `src/`).
   - Read every page, section, data file, and component to understand what currently exists.
2. **Identify & Eliminate "AI-Generated" Patterns**:
   - **Visual AI Clichés to Strip**: Generic purple/indigo-to-cyan neon gradients, glowing AI orbs, overused glassmorphism cards with identical 1px borders everywhere, generic Lucide icon badges in colored circles on every card, cookie-cutter 3-column bento grids with no visual hierarchy, and stock/placeholder imagery.
   - **Copywriting AI Clichés to Strip**: Robotic buzzwords ("Passionate developer crafting seamless digital experiences", "cutting-edge", "leveraging modern technologies", "delving into", "testament to", "revolutionary", "unleash").
   - **Structural Repetition to Strip**: Remove duplicate project descriptions, repeated skill lists/progress bars, redundant "About Me" paragraphs that say the same thing in three places, and repetitive CTA blocks.
3. **Locate Local Assets & Official CV**:
   - Search the workspace for my actual CV/resume file (`*.pdf`, `cv.*`, `resume.*` in `public/`, `src/assets/`, or root folders) and existing project screenshots, logos, SVGs, or videos.

### Phase 2: Core Design Philosophy — "Human-Built, Graphics More, Words Less"

Rebuild the visual language and layout pacing around four strict principles:

| Principle | What to Remove (Current State) | What to Build Instead (Target State) |
| :--- | :--- | :--- |
| **1. Graphics More, Words Less** | Long paragraphs, walls of bullet points, verbose feature explanations. | Interactive 2D/3D product previews, custom SVG architecture diagrams, animated UI mockups, live interactive demos/previews, and crisp 1-line micro-copy (max 12–18 words per project blurb). |
| **2. Human Craft & Tactile Feel** | Generic AI dark-mode template with glowing purple borders and rushed spacing. | Editorial typography (strong display serif or geometric sans paired with crisp monospace for metadata), intentional negative space, subtle film grain/noise texture, bespoke micro-interactions, and custom physics-based spring animations. |
| **3. Zero Repetition** | Repeating skills, bio claims, and project tech stacks across multiple sections. | Every section has a single distinct job. Once a concept, metric, or tool is shown visually, never repeat it in text elsewhere. |
| **4. Deliberate, Unrushed Pacing** | Cramped sections stacked back-to-back with uniform padding. | Generous viewport breathing room, asymmetric editorial grids, smooth scroll choreography, and tactile hover/focus states that reward curiosity. |

### Phase 3: Prominent Showcase of Flagship Live & GitHub Projects

Every working, professional, and live project—alongside my broader GitHub engineering work—must be presented as a **first-class, high-impact visual case study**, never buried in plain text cards.

1. **Discover & Sync All Live + GitHub Projects**:
   - Inspect existing project config/data files in the repo and check my GitHub profile/repositories (via local config, git remotes, or `gh repo list` if authenticated) so no real, working project is left behind.
   - Verify all live deployment URLs and GitHub repository links so every button works reliably.
2. **Flagship Tier — Featured Interactive Showcases**:
   Give prominent, centerpiece visual placement to my core high-accuracy working applications, including:
   - **QAU Kalam App** — Showcase its real academic/campus utility, mobile/web interface flows, and clean user experience with an interactive device frame or 3D tilted viewport mockup.
   - **Suba Taskbook** — Highlight its productivity/task-management workflow through an interactive mini-UI preview or layered 2.5D/3D spatial card stack showing task states in motion.
   - **Articles Downloader** — Illustrate the extraction/download pipeline visually (e.g., an animated input-to-article transformation graphic or interactive preview) with zero fluff.
   - **Humanizer** — Visually demonstrate the AI-to-human text transformation engine (e.g., an interactive before/after split slider or live morphing typography visual).
   - **Videos Downloader** — Present a sleek media-pipeline visual showcase with fast format/stream iconography and interactive hover preview.
   - **All Other Working & GitHub Projects** — Organize remaining live tools, experiments, and open-source GitHub repositories into an engaging, filterable visual Bento/Archive grid with interactive hover previews, live status indicators (`LIVE`, `OPEN SOURCE`, `PRODUCTION`), language/stack badges, and direct 1-click links to the Live App and GitHub Repo.
3. **2D & 3D Visual Treatment for Every Project**:
   - **Never show a naked text card.** Every project must have a custom visual anchor:
     - **3D / 2.5D Perspective Showcases**: Use CSS 3D transforms (`perspective`, `rotateX`, `rotateY`, layered parallax depth on cursor move) or Three.js / React Three Fiber / WebGL canvases where appropriate to give project mockups physical depth, lighting, and shadow.
     - **Bespoke 2D Interactive Graphics**: Where screenshots are missing or static, craft high-precision interactive SVG illustrations, animated UI skeletons, or live interactive micro-widgets that visually represent what the app actually does (e.g., real-time task toggle for Suba Taskbook, live text diff visual for Humanizer, media stream waveform/cards for Videos Downloader).
     - **Interactive Hover & Inspection**: Hovering or clicking a project should smoothly reveal live preview states, architecture highlights, and direct action triggers (`Launch Live App ↗`, `Source Code ↗`).

### Phase 4: Section-by-Section Architecture & Interactive Experience

Refactor the portfolio into a tight, engaging, zero-bloat flow:

1. **Hero Section (Visual & Interactive First Impression)**:
   - Replace generic "Hi, I'm [Name], a passionate developer..." tropes with a bold, unmistakable builder identity.
   - Build an interactive 2D/3D hero focal piece (e.g., an interactive spatial workbench, tactile floating project artifacts, or responsive shader/canvas grid that reacts subtly to cursor physics).
   - Keep hero copy under 20 words total: who I am, what I build, and immediate proof of work.
   - Include two high-contrast, tactile primary actions: **Explore Live Works** (smooth scroll to flagship projects) and **Download Official CV** (wired to my actual CV).
2. **Selected Live Works (The Centerpiece — 70% of Visual Weight)**:
   - Lead immediately with the flagship projects (**QAU Kalam App**, **Suba Taskbook**, **Articles Downloader**, **Humanizer**, **Videos Downloader**, plus top live builds).
   - Use large visual viewports (75%+ image/graphic/interactive canvas area, <25% text area per card).
   - Limit text per project to:
     - **Title + Live Badge** (`● Live in Production`)
     - **One crisp 1-sentence value hook** (written in concrete human builder language, zero AI buzzwords)
     - **3–4 core tech pills**
     - **Direct CTAs**: `Live Demo ↗` and `GitHub ↗`
3. **Interactive GitHub & Engineering Lab**:
   - Display the rest of my GitHub repositories and technical builds in a visually rich, interactive grid (with instant category/stack filtering, smooth layout transitions, and visual cards rather than plain text rows).
   - Ensure every repository card has a tailored 2D graphic/icon system, clear visual hierarchy, and working external links.
4. **Visual Stack & Architecture (No Percentage Bars)**:
   - Remove fake percentage bars (e.g., "React 95%") or endless icon walls.
   - Replace with a clean, interactive visual map or tactile component showcase that groups my tools by how I actually ship products (Frontend & Motion, Backend & APIs, Automation & Media Tools, Mobile/Cross-Platform).
5. **Official CV Integration ("Download Official CV")**:
   - Wire the **Download Official CV** button in the navigation bar, hero section, and footer directly to my actual CV PDF file (`download` attribute + option to preview in a sleek modal or new tab).
   - If multiple CV files exist in the project directory, inspect their dates/contents to ensure the most complete, up-to-date official CV is linked, and confirm the file path resolves with a `200 OK` status in both development and production builds.
   - Add a subtle file-metadata badge on hover (e.g., `Official CV • PDF • Verified`).

### Phase 5: Copywriting & Micro-Interaction Polish Checklist

Before finishing, enforce these strict quality gates across every file:

- **Word Count Reduction**: Cut total on-page word count by at least 50%. If a sentence can be replaced by an icon, badge, interactive toggle, or visual preview, replace it.
- **Human Builder Voice**: Write like a real engineer proud of shipping working software—direct, specific, grounded, and confident without exaggeration.
- **60fps Motion & Responsiveness**:
  - Use consistent spring physics or cubic-bezier curves (`cubic-bezier(0.22, 1, 0.36, 1)`) so interactions feel weighty and natural, never jittery or rushed.
  - Ensure all 2D/3D visuals degrade gracefully and remain super clean, touch-friendly, and fast on mobile and tablet screens.
- **Build & Runtime Verification**:
  - Run the project build/typecheck/linter (`npm run build` / `pnpm build` / `next build` / `vite build`), fix all console warnings, broken imports, hydration issues, or missing asset references, and verify the running app locally.

### Execution Deliverables Required from You (Claude Code)

1. **Start with a Complete Audit Report**: After scanning the repo, briefly list the exact files you inspected, the AI-slop patterns and repetitions you found, the complete list of live + GitHub projects discovered, and where my official CV file is located.
2. **Execute the Full Refactor**: Implement the new visual system, 2D/3D interactive project showcases (featuring **QAU Kalam App**, **Suba Taskbook**, **Articles Downloader**, **Humanizer**, **Videos Downloader**, and all GitHub works), radical copy tightening, and official CV download integration.
3. **Verify & Summarize**: Run the production build to confirm zero errors and provide a concise summary of every upgraded component and visual interaction.
