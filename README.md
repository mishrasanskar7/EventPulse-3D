# 🌐 EventPulse 3D – Responsive Event Management & Discovery Platform

> **K-Explore: Web Designing Assignment Project**  
> An interactive, responsive, and visually stunning 3D WebGL-powered event management platform built using modern **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **Three.js**.

[![Live Status](https://img.shields.io/badge/Status-Complete-success.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B%20%7C%20Three.js-blue.svg)](#)
[![Responsive](https://img.shields.io/badge/Design-Fully%20Responsive-orange.svg)](#)
[![Storage](https://img.shields.io/badge/Data-Client--Side%20LocalStorage-brightgreen.svg)](#)

---

## 📌 Table of Contents
1. [Project Overview & Problem Statement](#-project-overview--problem-statement)
2. [Key Features & Bonus Highlights](#-key-features--bonus-highlights)
3. [Interactive 3D Experience (Bonus Feature)](#-interactive-3d-experience-bonus-feature)
4. [File & Directory Architecture](#-file--directory-architecture)
5. [Step-by-Step Setup & Local Testing](#-step-by-step-setup--local-testing)
6. [Deployment Guide (GitHub Pages / Vercel / Netlify)](#-deployment-guide-github-pages--vercel--netlify)
7. [Git Version Control Instructions](#-git-version-control-instructions)
8. [Form Validation Rules & Regex](#-form-validation-rules--regex)
9. [Evaluation Rubric Checklist](#-evaluation-rubric-checklist)

---

## 🎯 Project Overview & Problem Statement

Modern event platforms demand immersive aesthetics, intuitive user exploration, dynamic information filtering, and frictionless registration flows. 

**EventPulse 3D** solves this by providing:
- An engaging **3D WebGL Hero Experience** where users interact with a pulsating holographic event core and particle orbits.
- **Spotlight Events** featuring live, real-time countdown timers.
- Comprehensive **Discovery Engine** allowing keyword searches and category filtering across Technology, Music & Arts, Workshops, Gaming/Esports, Design, and Business.
- **Dynamic Event Modals** with detailed agendas, speaker directories, and venue data.
- **Robust Client-Side JavaScript Form Validation** ensuring error-free user registrations.
- **Interactive 3D VIP Pass Generator** with simulated QR code and print/export functionality.
- **LocalStorage Registration Management** letting users track, inspect, and cancel their bookings anytime.

---

## ✨ Key Features & Bonus Highlights

### 1. Modern Responsive UI/UX
- **Glassmorphism Design System**: Sleek frosted glass cards with `backdrop-filter: blur()`, neon border glows, and smooth CSS transitions.
- **Dark / Light Mode Toggle**: One-click theme switcher with immediate visual feedback, persisting the user's preference in `localStorage`.
- **Fully Responsive**: Mobile-first design optimized for mobile phones (320px+), tablets (768px+), laptops, and 4K ultra-wide monitors.
- **Micro-Interactions**: Interactive 3D mouse parallax tilts on event cards, floating action buttons, and animated entrance toasts.

### 2. Search, Filter & Real-Time Discovery
- **Live Search**: Instant substring filtering matching event names, locations, tags, and descriptions.
- **Category Pills**: Filter by `Technology`, `Music & Arts`, `Workshops`, `Gaming & Esports`, `Design & UX`, and `Business`.
- **Dynamic Sorting**: Order events by upcoming date, popularity (seats remaining), or alphabetical title.

### 3. Interactive Form Validation (Vanilla JS)
- Real-time inline feedback preventing invalid submissions:
  - **Full Name**: Minimum 3 characters; rejects numbers/special characters.
  - **Email**: Strict RFC regex pattern check (`example@domain.com`).
  - **Phone Number**: Validates 10-digit formats with support for country prefixes.
  - **Event & Ticket Selection**: Ensures valid tier and non-empty event allocation.

### 4. Interactive 3D Digital VIP Pass & Confetti
- Generates a custom 3D ticket pass with unique booking ID (e.g. `TICK-839201`).
- Triggers celebratory fireworks using the Canvas Confetti engine.
- Supports **Print Ticket / Save as PDF** natively.

### 5. LocalStorage Data Management (Bonus)
- Persists all registrations locally on the client without requiring an external database.
- Dedicated **"My Passes"** drawer showing count badge, attendee details, quick view, and booking cancellation.

---

## 🌌 Interactive 3D Experience (Bonus Feature)

The website integrates **Three.js** via WebGL to create an interactive 3D visual spectacle:
- **Holographic Core**: A wireframe icosahedron rotating along dual axes with emissive cyan lighting.
- **Inner Octahedron Crystal**: Pulsating inner core symbolizing the live pulse of active events.
- **Orbital Particle Vortex**: 450+ multi-colored stars rotating in 3D spherical space.
- **Interactive Mouse Parallax**: Camera position smoothly dampens (`lerp`) toward cursor movements.
- **Performance Optimized**: Auto-pauses on background tabs via the `visibilitychange` API to preserve device battery and GPU resources.

---

## 📂 File & Directory Architecture

```
k-explore/
│
├── index.html               # Main HTML5 application structure & semantics
├── README.md                # Project documentation, setup & deployment guide
├── DOCUMENTATION.md         # Comprehensive project report & viva presentation guide
│
├── css/
│   └── styles.css           # Modern CSS3 styles, glassmorphism, 3D transforms & themes
│
└── js/
    ├── events-data.js       # Curated upcoming event datasets, agendas & speakers
    ├── storage.js           # LocalStorage CRUD manager for tickets & theme
    ├── three-scene.js       # Three.js 3D WebGL interactive canvas script
    └── app.js               # Application state, validation, filters, modals & confetti
```

---

## 🚀 Step-by-Step Setup & Local Testing

### Option A: Direct Browser Preview (Zero Install)
Because the project uses standard web technologies and CDNs, no build tools or package managers are required!
1. Clone or download the repository.
2. Double-click `index.html` or right-click `index.html` → **Open with Google Chrome / Microsoft Edge / Firefox**.

### Option B: Local Web Server (Recommended)
Running a local development server ensures proper module loading and smooth asset fetching:

Using **VS Code Live Server**:
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Click **"Go Live"** in the bottom status bar or right-click `index.html` → **Open with Live Server**.

Using **Node.js `npx serve`**:
```bash
npx serve .
```

Using **Python Built-in HTTP Server**:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 Deployment Guide (GitHub Pages / Vercel / Netlify)

### 1. Deploying on GitHub Pages (Free & Easiest)
1. Push your repository to GitHub (see Git instructions below).
2. Go to your GitHub repository in your browser.
3. Click on **Settings** (top tab) → **Pages** (left sidebar).
4. Under **Build and deployment** > **Branch**:
   - Select `main` (or `master`) branch.
   - Folder: `/ (root)`.
5. Click **Save**.
6. Within 1-2 minutes, your website will be live at:
   `https://<your-username>.github.io/<repository-name>/`

### 2. Deploying on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New Project** → Import your GitHub repository.
3. Keep default settings (Framework Preset: Other, Root Directory: `./`).
4. Click **Deploy**. Vercel will instantly generate a live URL like `https://eventpulse-3d.vercel.app`.

### 3. Deploying on Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Drag and drop the `k-explore` folder onto the Netlify dashboard, OR connect via GitHub.
3. Click **Deploy Site** to get your public production URL.

---

## 💻 Git Version Control Instructions

To submit your GitHub repository link as required:

```bash
# 1. Initialize git in the project directory
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete responsive 3D event management website with validation and localstorage"

# 4. Link your remote GitHub repository
git remote add origin https://github.com/<your-username>/k-explore-event-management.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🛡️ Form Validation Rules & Regex

| Field | Validation Rule | Regex Pattern | Error Feedback |
| :--- | :--- | :--- | :--- |
| **Full Name** | Min 3 chars, alphabets only | `/^[a-zA-Z\s.'-]+$/` | "Please enter a valid full name." |
| **Email** | Valid RFC-compliant email | `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | "Please enter a valid email address." |
| **Phone** | Standard 10-digit number | `/^[+]?[0-9]{10,14}$/` | "Please enter a valid 10-digit phone number." |
| **Event Select** | Non-empty selection | `value !== ""` | "Please select an event to register for." |
| **Ticket Tier** | Valid tier selected | `value !== ""` | "Please select a ticket tier." |

---

## 🏆 Evaluation Rubric Checklist

- [x] **Creativity**: Interactive 3D WebGL holographic sphere, 3D card tilt physics, 3D digital VIP pass, and celebration confetti.
- [x] **UI/UX & Responsiveness**: Fluid typography, responsive CSS Grid/Flexbox, accessible color contrast, mobile navigation drawer.
- [x] **Functionality**: Live search, category filtering, sorting, live countdown timers, detailed modal views.
- [x] **JavaScript Form Validation**: Comprehensive real-time regex-based client validation with clear error messaging.
- [x] **Bonus Challenges**: Dark/Light mode toggle, dynamic countdown timers, LocalStorage registration management (create, view, cancel).
- [x] **Code Quality**: Clean modular architecture, semantic HTML5, well-commented ES6+ JavaScript.
- [x] **Documentation**: Complete `README.md` and `DOCUMENTATION.md` for project presentation and viva evaluation.

