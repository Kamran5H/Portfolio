# 🌐 Kamran Ashraf — Developer Portfolio

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Theme](https://img.shields.io/badge/Aesthetic-Terminal%20%2F%20Cyberpunk-00F2FE?style=for-the-badge)](https://kamranashraf.com)

**Personal developer portfolio showcasing AI systems, computational chemistry research, and autonomous engineering in an interactive terminal / cyberpunk aesthetic.**

[Live Demo](https://kamranashraf.com) • [Key Features](#-key-features) • [Design System](#-design-system--aesthetic) • [Quickstart](#-quick-start) • [License](#-license)

</div>

---

## 🌟 Executive Overview

This repository houses the source code for the official developer portfolio of **Kamran Ashraf** (`Kamran5H`). Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, the application delivers an unforgettable, high-performance web experience that combines a cyberpunk retro-futuristic HUD with high-density technical showcases.

---

## 🚀 Key Features

- **⚡ Next.js 14 App Router Architecture**: Server-side rendering (SSR), optimized asset delivery, and static generation for near-instant page load times.
- **🖥️ Interactive Terminal Console**: Fully responsive command-line simulator allowing visitors to query bio details, skill sets, project repositories, and contact info via keyboard commands.
- **🌌 Cyberpunk & Sci-Fi Aesthetic**:
  - Digital rain / Matrix backdrop effects
  - CRT scanlines, chromatic aberration, and subtle glitch micro-animations
  - Radiant neon accents (`#00F2FE`, `#8B5CF6`, `#EC4899`, `#10B981`)
- **📱 Fully Responsive HUD**: Seamlessly transforms from a multi-column desktop command bridge into an ergonomic, touch-friendly mobile interface.
- **🔒 100% Type-Safe**: Strict TypeScript configuration ensuring rock-solid component stability.

---

## 🎨 Design System & Aesthetic

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Neon Cyan** | `#00F2FE` | Primary accent, prompt symbols, terminal headings |
| **Electric Purple**| `#8B5CF6` | Secondary accent, AI & agentic highlight badges |
| **Hot Pink** | `#EC4899` | Physical chemistry & molecular physics metrics |
| **Emerald Green** | `#10B981` | Online status indicators, test pass rate badges |
| **Void Obsidian** | `#0B0F19` | Deep space background canvas |

---

## 📁 Repository Structure

```text
Portfolio/
├── app/                        # Next.js App Router (pages, layout, metadata)
│   ├── layout.tsx              # Root HTML structure, fonts, and global metadata
│   ├── page.tsx                # Main cyberpunk terminal & project showcase page
│   └── globals.css             # Tailwind base styles and CRT scanline animations
├── components/                 # Reusable UI components
│   ├── Terminal.tsx            # Interactive CLI emulator component
│   ├── ProjectCard.tsx         # Flagship repository card component
│   └── MatrixRain.tsx          # Canvas-based digital rain background
├── lib/                        # Utility functions, project datasets & constants
├── public/                     # Static assets, icons, and fonts
├── tailwind.config.ts          # Custom color palettes, shadows, and animations
├── tsconfig.json               # TypeScript strict configuration
├── .gitignore                  # Next.js and build artifact exclusions
└── LICENSE                     # Open-source MIT License
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18.17+ or higher
- npm / yarn / pnpm

### Development
```bash
# Clone the repository
git clone https://github.com/Kamran5H/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the live development build.

### Production Build
```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 📜 License

This project is open-source and released under the [MIT License](LICENSE).  
Copyright (c) 2024-2026 **Kamran Ashraf**.
