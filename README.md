# Sami-Ullah-Akram | Backend & Web Developer Portfolio

A production-ready personal developer portfolio and freelance services platform designed and engineered for **Sami-Ullah-Akram** (Backend & Web Developer).

## Overview

This portfolio website is crafted to:
1. Attract freelance web development and API engineering clients.
2. Demonstrate real-world technical competency to hiring managers and recruiters.
3. Showcase full-stack and backend projects with comprehensive architecture case studies, featuring **U.S. Barber** and **AbaidUllah Group of Colleges**.
4. Provide direct verified communication channels: Email (`samiakram583@gmail.com`), WhatsApp (`+92 311 1629335`), and Instagram (`@sua.digital.26`).

---

## Core Features

- **3-Zone Top Bar Contract:** Clean brand wordmark, single-line navigation links with scroll spy, and primary conversion CTA.
- **Interactive Hero & Live Code Terminal:** Interactive tabbed code inspector showing an authentic FastAPI ASGI endpoint with atomic transaction slot locking and system architecture diagram.
- **Featured Project Spotlights:**
  - **U.S. Barber:** Full-stack business platform for barber discovery, service listing, and appointment booking (React, TypeScript, Supabase, Tailwind CSS).
  - **AbaidUllah Group of Colleges:** Modern educational website demonstrating academic programs, admissions criteria, campus facilities, and student inquiry channels.
- **Comprehensive Project Suite:**
  - **Business Management Dashboard** (Full-Stack Application)
  - **Business REST API** (FastAPI, Python, PostgreSQL, Pydantic)
  - **Modern E-Commerce Platform** (Full-Stack Storefront & Cart Workflow)
  - **Restaurant Business Website** (Culinary showcase & table reservation)
  - **Developer API Platform** (Backend testing, rate limiting, Docker)
- **Instant Project Filtering:** Instant client-side filtering across `All`, `Websites`, `Frontend`, `Backend`, `Full Stack`, `Business`.
- **Deep-Linkable Case Study Modals:** Interactive case study viewer supporting `#project-[slug]` deep links with problem/solution breakdown, technical decisions, and code snippets.
- **Floating WhatsApp Quick Action:** Accessible floating button in bottom-right corner for direct WhatsApp conversations.
- **Interactive Contact Engine:** Form with client-side validation alongside verified direct channels (Email, WhatsApp, Instagram).
- **Integrated Resume Viewer:** Built-in modal viewer for Sami's curriculum vitae with one-click Markdown download and print-to-PDF formatting.
- **Private Admin Panel (`/admin`):** Secure private administration dashboard for the site owner (`samiakram583@gmail.com`) to inspect incoming contact messages, filter unread inquiries, search clients, view full message threads, and reply via Email or WhatsApp. Protected by Supabase Auth and Row Level Security (RLS).
- **Supabase Backend Integration:** Real-time persistence connecting appointment bookings and project inquiries directly to the connected Supabase database (`gjdwleugyubxmwmzfojq`), with schema fallback resilience and local queueing.
- **Production-Grade SEO & OpenGraph:** Semantic headings, OpenGraph social sharing tags, Twitter cards, and Schema.org JSON-LD structured data (`Person`, `WebSite`, `CreativeWork`).
- **Dark-First Architectural Aesthetic:** Built on a `#121314` foundation with WCAG 2.2 AA compliant contrast, single-level card elevations, and zero-pill typographic metadata discipline.

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4 with custom typography and dark surface elevations
- **Icons:** Lucide React
- **Typography:** Plus Jakarta Sans & JetBrains Mono

---

## Project Structure

```text
├── index.html                  # SEO tags, fonts, Schema.org JSON-LD
├── metadata.json               # Applet identity and capabilities
├── package.json
├── src/
│   ├── App.tsx                 # Main application page layout
│   ├── main.tsx                # React DOM entry point
│   ├── index.css               # Tailwind CSS imports & base styles
│   ├── assets/
│   │   └── images/             # Generated high-resolution project mockups
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky responsive navigation with mobile drawer
│   │   ├── Hero.tsx            # Hero section with interactive code preview
│   │   ├── About.tsx           # Developer introduction and highlights
│   │   ├── Services.tsx        # 4 client service offering cards
│   │   ├── Skills.tsx          # Categorized skills matrix with filters
│   │   ├── Projects.tsx        # Featured projects grid & spotlight
│   │   ├── ProjectModal.tsx    # Technical case study modal with architecture
│   │   ├── Experience.tsx      # Career & education timeline
│   │   ├── Testimonials.tsx    # Professional collaboration standards
│   │   ├── Contact.tsx         # Validated inquiry intake form
│   │   ├── ResumeModal.tsx     # Full CV document viewer with export options
│   │   └── Footer.tsx          # Footer with quick links and copyright
│   └── data/
│       ├── siteConfig.ts       # Centralized config (name, email, socials)
│       ├── projects.ts         # Portfolio project items & case study details
│       ├── skills.ts           # Skills catalog and hero stack
│       ├── services.ts         # Service definitions and inquiry routing
│       └── experience.ts       # Timeline milestones and education
```

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
The app will run locally at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
This compiles the TypeScript code and bundles the production assets into `dist/`.

---

## Customization

To personalize social links, email address, or add new projects:
- Edit `src/data/siteConfig.ts` to update email, GitHub, WhatsApp, and Instagram handles.
- Add or edit projects in `src/data/projects.ts`.
- Adjust services or pricing tiers in `src/data/services.ts`.

---

## License

Apache-2.0
