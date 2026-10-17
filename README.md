# Muhammad Kamran Ashraf (Kami)
### MPhil Physical Chemistry Researcher & Computational Scientist
**Quaid-i-Azam University (QAU), Islamabad**  
Supervisor: **Prof. Dr. Safeer Ahmed** | Co-Supervisor: **Dr. Zahid Rashid**

---

## 🌟 Overview
This repository contains the full-stack web application portfolio of **Muhammad Kamran Ashraf**, postgraduate researcher in Physical & Computational Chemistry at Quaid-i-Azam University, Islamabad.

Built as a modern, high-performance web app powered by **Next.js 14 App Router**, **Three.js WebGL**, **Tailwind CSS**, and connected to **Neon Serverless PostgreSQL** and deployed on **Microsoft Azure**.

---

## 🏗️ Architecture & Cloud Stack

```mermaid
graph TD
    Client["Browser / Visitor"] --> Azure["Azure Static Web Apps (East Asia)"]
    Azure --> NextApp["Next.js 14 App Router SSR / Edge"]
    NextApp --> WebGL["Three.js 3D Molecular Engine"]
    NextApp --> APIRoutes["Next.js Serverless API Routes (/api/*)"]
    APIRoutes --> NeonPool["Neon Serverless PostgreSQL (Pooled SSL)"]
    NeonPool --> DB[(Tables: inquiries, collaborations, site_analytics)]
```

- **Frontend & App Framework**: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS.
- **Molecular & Quantum Simulation**: Three.js WebGL (Interactive Ce-doped NiCo-MOF, Urea-PANi, CaO Nanocrystals, and dz² d-Orbital quantum surfaces with `IntersectionObserver` pause).
- **Database Layer**: Neon Serverless PostgreSQL (`@neondatabase/serverless`) with connection pooling and graceful mock fallback.
- **Cloud Hosting**: Microsoft Azure Static Web Apps (`kamran-portfolio-rg` in East Asia).
- **Continuous Deployment**: Automated GitHub Actions workflow (`.github/workflows/azure-static-web-apps.yml`).
- **Custom Domain Ready**: Preconfigured with SSL and Azure custom domain mappings (CNAME & Apex ALIAS).

---

## 🔬 Scientific & Academic Highlights

### 1. Reverse-Chronological Academic Trajectory (2025–2015)
- **2025 – Present**: MPhil Physical Chemistry (4th Semester, Session 2025–2027) at Quaid-i-Azam University, Islamabad. Registration No: `02062511039`, Coursework CGPA: `3.30/4.00`. Computational Electrocatalysis & Quantum DFT modeling on Ce-doped bimetallic NiCo-MOFs for ORR/OER.
- **Jan 2024 – Feb 2025**: Senior Chemistry Lecturer at Unique Science Academy & High School, Johar View Campus, Lahore.
- **2020 – 2024**: BS (Hons) Chemistry at School of Chemistry, University of the Punjab (PU, Lahore). Roll No: `BSAD-Chem-M-66`, Reg No: `2020-mco-485`. Capstone on green synthesized CaO nanoparticles & Urea-imprinted PANi electrochemical biosensor.
- **Jan 2019 – Jan 2022**: Science Teacher (Chemistry, Physics, Math) at The Educators (Beaconhouse System), Noor Campus, Okara.
- **2020 – 2022**: Associate Degree in Science (ADS / B.Sc) at Govt. Post Graduate College, Okara / PU.
- **2017 – 2019**: Higher Secondary School Certificate (F.Sc Pre-Medical) at BISE Sahiwal (`960/1100`, Grade A+, 87.27%).
- **2015 – 2017**: Secondary School Certificate (Matriculation in Science) at BISE Sahiwal (`917/1100`, Grade A+, 83.36%).

### 2. Working Research Manuscripts
1. **Under Departmental Review**: *"Why the Corner Is Empty: Antagonistic Requirements in Re-chargeable Zinc–Air Batteries"* (M. K. Ashraf, H. Maqbool, Safeer Ahmed*).
2. **Completed Manuscript**: *"Grafting of Ethyl Acetoacetate onto Chitosan with Ammonium Persulfate"* (A. Rehman†, M. K. Ashraf†*, H. Maqbool).
3. **In Preparation**: *"Facile Biosynthesis of Calcium Oxide Nanoparticles from Citrus limetta Peels for Enhanced Photocatalytic Degradation of Methylene Blue"* (M. K. Ashraf, Imran Din*, Safeer Ahmed).
4. **Research Project**: *"Conductive Polyaniline/Urea Nanocomposite Films for Potentiometric Diagnostic Biosensing"* (M. K. Ashraf, Adeel Afzal*, Safeer Ahmed).

### 3. Interactive Laboratory Calculators
- **Solution Preparation Calculator**: Calculates mass required from desired molarity, molecular weight, and volume ($m = M \times MW \times V$) across 19 standard laboratory reagents.
- **Solution Dilution Engine**: Computes target volume or stock requirements via $M_1V_1 = M_2V_2$ with one-click recipe copying.

### 4. Verified Academic Documents & Credentials
Click-to-inspect high-resolution scans of official credentials:
- QAU Student Identity Card (`02062511039`)
- University of the Punjab BS Chemistry Degree & Official Transcript
- BISE Sahiwal F.Sc Pre-Medical & Matriculation Certificates
- Formal Institutional Teaching Experience Letters (Unique Academy & The Educators)
- Green International University Co-curricular Award

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ (tested with Node 20 / 22 / 24)
- npm or pnpm

### Quickstart
```bash
# 1. Clone repository
git clone https://github.com/Kamran5H/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. (Optional) Configure Neon PostgreSQL database
cp .env.example .env.local
# Add your Neon connection string:
# DATABASE_URL="postgresql://user:password@ep-xyz.eastus2.aws.neon.tech/neondb?sslmode=require"

# 4. Initialize Database Schema (Tables: inquiries, collaborations, site_analytics)
npm run db:init

# 5. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live web application.

---

## 🗄️ Neon Serverless PostgreSQL Setup

1. Create a free PostgreSQL database at [https://console.neon.tech](https://console.neon.tech).
2. Copy the pooled connection string (with `?sslmode=require`).
3. Set the environment variable in your local `.env.local` or Azure Static Web App settings:
   ```env
   DATABASE_URL="postgresql://kamran_owner:xxxx@ep-cool-wave-xxxx.eastus2.aws.neon.tech/neondb?sslmode=require"
   ```
4. Run the schema initializer:
   ```bash
   npm run db:init
   ```
> *Note: If `DATABASE_URL` is omitted, the web app operates in Resilient Fallback Mode using an in-memory mock store so all form submissions and API health checks succeed without downtime.*

---

## ☁️ Microsoft Azure Deployment

This repository is preconfigured for **Azure Static Web Apps** with automated GitHub Actions CI/CD.

### Azure Static Web App Configuration
- Resource Group: `kamran-portfolio-rg`
- Region: `eastasia`
- Workflow: `.github/workflows/azure-static-web-apps.yml`
- App Location: `/`
- Output Location: `.next`

### Azure Environment Variables
In the Azure Portal, navigate to **Static Web App > Configuration > Application Settings** and add:
- `DATABASE_URL`: Your Neon Serverless PostgreSQL connection string.

---

## 🌐 Custom Domain Setup

When configuring your custom subdomain (e.g. `kamranashraf.is-a.dev`):

| Record Type | Host / Name | Value / Target | Notes |
|:---|:---|:---|:---|
| **CNAME** | `@` / `kamranashraf` | `zealous-wave-0fa444a00.5.azurestaticapps.net` | Points `kamranashraf.is-a.dev` directly to Azure Static Web Apps |

Then, add the domain in the Azure Portal under **Static Web App > Custom Domains > Add** (select **CNAME validation**). Azure validates the DNS and automatically issues a free TLS/SSL certificate.

---

## 👨‍🔬 Scholar & Supervision Contacts
- **Scholar**: Muhammad Kamran Ashraf (`kamranashraf51214@gmail.com`)
- **Research Supervisor**: Prof. Dr. Safeer Ahmed (`safeerad@qau.edu.pk`)
- **Department**: Department of Chemistry, Quaid-i-Azam University, Islamabad 45320, Pakistan
- **GitHub**: [https://github.com/Kamran5H](https://github.com/Kamran5H)
