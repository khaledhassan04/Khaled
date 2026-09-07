# Modern UI/UX Designer & Developer Portfolio

A modern, responsive, high-converting portfolio website tailored specifically for a **hybrid UI/UX Designer and Full-Stack Developer**.

Built with modern web standards (HTML5, Tailwind CSS CDN, Modern ES6+, Lucide Icons, and Custom CSS variables), requiring **zero build toolchains or npm dependencies**.

---

## Features

- **Hero & Interactive Canvas**: Real-time interactive particle & gradient background that responds smoothly to cursor movements.
- **Dynamic Case Study Modals**: Deep-dive modals highlighting user research, problem statements, UX workflows, measurable metrics, and source code links.
- **Interactive Design System Playground**: Live sandbox where visitors can switch color palettes (Electric Violet, Cyber Emerald, Solar Amber, Hyper Cyan), border radius tokens, font scale multipliers, and copy real-time CSS token variables with one click.
- **Dual-Core Competencies**: Showcases both visual design mastery (Figma, tokens, wireframes, WCAG AAA) and software engineering prowess (TypeScript, React, CSS Architecture, APIs).
- **Web Audio API Haptics**: Subtle, synthesized acoustic clicks on UI interaction (with an instant mute/unmute toggle, zero audio file downloads).
- **Dark & Light Mode**: Instant smooth theme switching with persistent `localStorage` memory and system preferences support.
- **Live Local Timezone Clock**: Live clock showing the designer's working hours and availability.
- **Interactive Contact Form**: Project type pills, budget selector, real-time message character counter, and simulated validation & success states.
- **Curriculum Vitae / Resume Modal**: Built-in formatted CV preview with quick print and download actions.

---

## File Structure

```
clever-salk/
├── index.html                       # Semantic single-page application structure
├── css/
│   └── styles.css                   # Theme variables, glassmorphism, animations
├── js/
│   ├── projects-data.js             # Data store for projects, case studies, skills & testimonials
│   ├── background.js                # Interactive canvas particle & spotlight effect
│   ├── design-system.js             # Interactive design tokens playground logic
│   └── main.js                      # Modal management, filtering, theme toggle, contact form
├── assets/
│   └── images/                      # SVG project mockups, avatars, vector illustrations
├── serve.ps1                        # Zero-dependency PowerShell local server
└── README.md                        # Documentation & setup guide
```

---

## Quick Start / Local Preview

### Option 1: Double-click or open directly
You can open `index.html` directly in Google Chrome, Microsoft Edge, Firefox, or Safari!

### Option 2: Run the built-in local server (PowerShell)
Open PowerShell in this project folder and run:
```powershell
.\serve.ps1
```
This serves the project at `http://localhost:8080/` and automatically opens your default browser.

---

## How to Customize

1. **Change Your Name & Bio**:
   Open `js/projects-data.js` and edit the `profile` object (name, role, availability, location, email, stats, and social links).
2. **Add / Modify Projects**:
   In `js/projects-data.js`, edit the `projects` array. You can add new projects, change tags, metrics, and case study narratives.
3. **Change Images**:
   Replace or add graphics in `assets/images/` and update the `image` path in `projects-data.js`.

---

## Deploying to Production

Because this portfolio is built with zero-build static architecture, you can deploy it in seconds:

- **GitHub Pages**: Push this repository to GitHub, go to **Settings > Pages**, and select `main` branch `/ (root)`.
- **Vercel**: Drag and drop the folder into Vercel dashboard or run `vercel`.
- **Netlify**: Drag and drop the project folder into Netlify Drop.
- **Cloudflare Pages**: Connect your GitHub repo and select "No build command" with output directory `/`.
