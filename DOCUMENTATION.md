# 📑 EventPulse 3D – Project Report & Presentation Guide

**Course:** K-Explore – Web Designing  
**Assignment:** Design and Develop a Responsive Event Management Website  
**Project Title:** EventPulse 3D – Interactive WebGL Event Discovery & Registration Platform  
**Author / Student:** [SANSKAR MISHRA / 2430272] 
**Section:** ECS - 3
**Technology Stack:** HTML5, CSS3, JavaScript (ES6+), Three.js WebGL, LocalStorage API  

---

## 1. Executive Summary

The **EventPulse 3D** project is an interactive, responsive, and high-performance event discovery and registration web application designed to meet and exceed all academic requirements and bonus challenges. 

Traditional event websites often suffer from static visual presentations and generic form layouts. **EventPulse 3D** bridges the gap between conventional web applications and immersive modern experiences by incorporating:
1. **Interactive 3D WebGL Canvas**: A real-time 3D hero model built with Three.js that responds smoothly to mouse and touch interactions.
2. **Live Dynamic Countdown Timers**: Real-time ticker clocks keeping attendees informed of upcoming deadlines.
3. **Robust Instant Form Validation**: JavaScript-driven client-side data verification before state persistence.
4. **Client-Side Persistence (LocalStorage)**: Instant saving, viewing, and cancellation of bookings with zero backend latency.
5. **Interactive 3D VIP Ticket Pass**: Automatic generation of a holographic digital ticket pass with simulated QR scanning and print capabilities upon registration.
6. **Dark / Light Mode**: A persistent theme engine adapting to user preference.

---

## 2. System Architecture & Component Flow

```
                                +---------------------------+
                                |        User Device        |
                                |  (Mobile / Tablet / PC)   |
                                +-------------+-------------+
                                              |
                                              v
                                +---------------------------+
                                |      index.html (DOM)     |
                                +-------------+-------------+
                                              |
       +--------------------+-----------------+--------------------+--------------------+
       |                    |                 |                    |                    |
       v                    v                 v                    v                    v
+--------------+   +----------------+   +-----------+    +-------------------+   +---------------+
|  Three.js    |   |  Search &      |   | Countdown |    | JS Form Validator |   | LocalStorage  |
|  3D Engine   |   |  Category      |   | Timers    |    | (Regex checks for |   | CRUD Engine   |
| (Interactive |   |  Filters       |   | (Live sec |    |  Name, Email,     |   | (Save, List,  |
|  WebGL scene)|   | (Dynamic grid) |   |  updates) |    |  Phone & Tickets) |   |  Cancel pass) |
+--------------+   +----------------+   +-----------+    +-------------------+   +---------------+
       |                    |                 |                    |                    |
       +--------------------+-----------------+--------------------+--------------------+
                                              |
                                              v
                                +---------------------------+
                                |   Interactive 3D Ticket   |
                                |    Pass & Confetti FX     |
                                +---------------------------+
```

---

## 3. Detailed Technical Breakdown

### A. The 3D WebGL Experience (`js/three-scene.js`)
- **Engine**: Three.js (r128).
- **Core Geometry**: `THREE.IcosahedronGeometry(4.8, 1)` rendered with wireframe shading and additive emissive lighting, encasing an inner solid octahedron crystal.
- **Particle System**: 450 vertices distributed using spherical coordinates `(r, θ, φ)` to create a floating planetary starfield.
- **Interactivity**: Linear interpolation (`lerp`) calculates mouse offsets and gently rotates the camera perspective on cursor movement.
- **Resource Management**: Integrates the `visibilitychange` API to pause rendering when the browser tab is hidden, preventing CPU/GPU draining.

### B. Dynamic Search & Category Filtering (`js/app.js`)
- **Dataset**: `js/events-data.js` exposes structured objects with properties: `id`, `title`, `category`, `date`, `venue`, `price`, `speakers`, `agenda`, `seatsRemaining`.
- **Filtering Logic**: Implements multi-conditional array filtering:
  ```javascript
  let filtered = AppState.events.filter(evt => {
    const matchesCategory = AppState.selectedCategory === 'all' || evt.category === AppState.selectedCategory;
    const matchesSearch = !AppState.searchQuery || 
      evt.title.toLowerCase().includes(AppState.searchQuery) ||
      evt.venue.toLowerCase().includes(AppState.searchQuery);
    return matchesCategory && matchesSearch;
  });
  ```
- **Live Sorting**: Dynamically sorts results by chronological date, popularity (lowest seats remaining), or alphabetical title.

### C. JavaScript Form Validation Engine
All form inputs are validated using custom regular expressions on both `input` and `blur` events, as well as on form submission:
- **Name**: Must be at least 3 characters and contain valid alphabet characters.
- **Email**: Validated against `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- **Phone**: Validated against international / 10-digit mobile standards `/^[+]?[0-9]{10,14}$/`.
- **Visual Feedback**: Applies `.input-invalid` (red border + shake + warning message) or `.input-valid` (green border) with real-time error clearance.

### D. Client-Side Data Persistence (`js/storage.js`)
- Uses `window.localStorage` with error handling wrapped in `try...catch` blocks.
- Stores registrations as an array of JSON objects under the key `pulse_sphere_registrations`.
- Supports full CRUD actions:
  - **Create**: Saves new booking with generated ticket ID (e.g., `TICK-584912`).
  - **Read**: Renders user tickets in the **"My Passes"** modal.
  - **Delete**: Allows users to cancel their registration with instant confirmation.
  - **Theme**: Remembers user preference between Dark and Light modes.

---

## 4. UI/UX & Responsive Design Principles

| Design Principle | Implementation in EventPulse 3D |
| :--- | :--- |
| **Visual Hierarchy** | High-contrast hero typography with vibrant cyan/purple gradients drawing immediate focus to CTAs. |
| **Glassmorphism** | Frosted glass cards (`backdrop-filter: blur(16px)`) that let background colors glow through. |
| **Feedback & Micro-interactions** | 3D card tilt on hover, toast notifications for actions, and celebratory confetti upon registration. |
| **Accessibility (a11y)** | Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<dialog>`), keyboard ESC modal closing, ARIA labels. |
| **Mobile Responsiveness** | Breakpoints at 1024px and 768px, hamburger toggle menu, auto-collapsing ticket pass grid. |

---

## 5. Viva Voce / Presentation Q&A Preparation

Here are key questions your evaluator/teacher may ask during your project demonstration, along with recommended answers:

### Q1: Why did you choose Three.js for the 3D element?
> **Answer:** "Three.js provides direct access to WebGL rendering in the browser without requiring external plugins or heavy frameworks. It allows us to render lightweight 3D geometries, particle clouds, and interactive lighting with 60 FPS performance, creating a memorable first impression that sets our event platform apart."

### Q2: How does the form validation ensure data integrity?
> **Answer:** "The form validation uses pure vanilla JavaScript without external dependencies. It uses regular expressions to enforce strict formats on email addresses and 10-digit phone numbers. Validation happens both in real time as the user types and upon submission, showing specific helper error messages beneath each input field."

### Q3: How are bookings stored and managed without a backend database?
> **Answer:** "To fulfill the bonus challenge requirement, we implemented a custom `StorageManager` module using the browser's `localStorage` API. Each registration is serialized into JSON with a unique booking ID and stored on the client. Users can view their registered passes in the 'My Passes' drawer and cancel them at any time."

### Q4: How did you ensure responsiveness across different devices?
> **Answer:** "We adopted a mobile-first responsive strategy utilizing CSS Grid (`minmax()` auto-fit/auto-fill) and Flexbox. Fluid typography using `clamp()` ensures headlines scale seamlessly from mobile phones to 4K displays. For mobile users, a smooth hamburger slide-in navigation menu is provided."

---

## 6. Slide-by-Slide Presentation Outline (For Class Presentation)

- **Slide 1: Title Slide**: EventPulse 3D – Responsive Event Management Website (Name, Roll No., Subject).
- **Slide 2: Problem Statement & Objectives**: The need for modern, interactive, and responsive event platforms.
- **Slide 3: Key Features & Bonus Additions**: 3D WebGL scene, live countdowns, search/filter suite, local storage management.
- **Slide 4: System Architecture & Technologies**: HTML5, CSS3, JavaScript ES6+, Three.js, Canvas Confetti.
- **Slide 5: Live Demonstration**:
  1. Orbiting 3D hero canvas & Dark/Light mode toggle.
  2. Searching & filtering events by category.
  3. Form validation demo (triggering validation errors, then successful submission).
  4. Viewing the generated 3D VIP pass and confetti celebration.
  5. Inspecting "My Passes" and canceling a ticket.
- **Slide 6: Conclusion & Future Scope**: Adding payment gateway integration (Stripe), calendar syncing (.ics), and backend sync.

