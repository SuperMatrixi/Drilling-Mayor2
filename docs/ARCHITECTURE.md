# 🏗️ ARCHITECTURE – Dschang 2026 Technical Overview

**Serge Baresi Tessa – Opération Ville Propre**
Site: [tessa2026.netlify.app](https://tessa2026.netlify.app) · Avril 2026

---

## 🗂️ Repository Structure

```
Drilling-Mayor2/
├── src/                          ← Netlify publish directory
│   ├── index.html                ← Self-contained SPA (~156 KB)
│   ├── js/
│   │   ├── chatbot.js            ← AzA chatbot (40 FAQ × 3 languages, voice)
│   │   └── main.js               ← Navigation, carousel, forms, weather API
│   ├── css/
│   │   └── style.css             ← Design system, CSS variables, responsive
│   └── assets/
│       └── images/               ← Deployed images (25 total)
├── assets/
│   └── images/                   ← Image staging area (organize before deploy)
│       ├── hero/                 ← Hero/cover images
│       ├── blog/                 ← Blog post thumbnails
│       ├── press/                ← Press/media images
│       ├── carousel/             ← Gallery carousel slides
│       └── logos/                ← Logo files
├── docs/                         ← Project documentation
│   ├── README.md                 ← Deployment guide (FR)
│   ├── CONTENT.md                ← Trilingual content specifications
│   ├── MINDMAP.md                ← Site structure & section map
│   ├── DEPLOYMENT.md             ← This deployment guide
│   ├── ARCHITECTURE.md           ← Technical architecture (this file)
│   └── YEMBA_LANGUAGE_GUIDE.md  ← Yemba language reference
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md         ← Standardized bug report template
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE.md
├── CODE_OF_CONDUCT.md
├── netlify.toml                  ← Netlify config (publish: src, headers, redirects)
└── README.md                     ← Main project overview
```

---

## 🖥️ Technology Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | HTML5 / CSS3 / JavaScript (ES6+) | Single-page application |
| **CSS Architecture** | CSS Custom Properties (variables) | Design tokens, no preprocessor |
| **Hosting** | Netlify | Static site, auto-deploy from GitHub |
| **Forms** | Netlify Forms | Contact form & sign-up |
| **Weather API** | Open-Meteo | Live weather for Dschang |
| **Video** | YouTube Embed | `@DSCHANG2026` channel |
| **Chatbot** | AzA (custom) | Web Speech API, 40 FAQ, 3 languages |
| **Schema.org** | JSON-LD | Person, Organization, Event |

---

## 📄 index.html — Self-Contained SPA

`src/index.html` is a **fully self-contained** single-page application (~156 KB).
All CSS and JavaScript are inlined. No external stylesheet or script file is loaded at runtime.

> The files `src/css/style.css`, `src/js/main.js`, and `src/js/chatbot.js` are the **source files** used to build/maintain the inline code in `index.html`.

### Page Sections (top to bottom)

| # | Section | HTML ID | Description |
|---|---------|---------|-------------|
| 0 | Ticker | `#news-ticker` | Scrolling events + live weather |
| 0b | Top Bar | — | Social links + language switcher |
| 1 | Navigation | `#main-nav` | Sticky nav with logo |
| 2 | Hero | `#hero` | Full-width portrait, square aspect ratio |
| 3 | Gallery | `#photo` | 16-slide carousel, letterbox images |
| 4 | Press | `#presse` | 7 press cards, reverse chronological |
| 5 | Forages | `#forages` | 100 Wells project, 3 phases |
| 6 | Video | `#video` | YouTube autoplay |
| 7 | Blog | `#blog` | News posts, letterbox thumbnails |
| 8 | Vision | `#vision` | 6 pillars of governance |
| 9 | Contact | `#contact` | 2 forms + WhatsApp canal link |
| 10 | Footer | — | Links + copyright |
| F | Chatbot AzA | `#AzA-widget` | Floating chatbot button |

---

## 🎨 Design System

### Color Tokens (CSS Variables)

| Variable | Value | Usage |
|----------|-------|-------|
| `--green` | `#006633` | Primary brand color |
| `--green-dark` | `#004422` | Top bar, navigation |
| `--gold` | `#D4AF37` | Accents, badges, borders |
| `--chatbot-blue` | `#0077cc` / `#00468b` | AzA chatbot widget |
| `--blog-thumb-bg` | `#000` | Letterbox background |
| `--hero-bg` | `#001a0d` | Hero fallback + glow |

### Responsive Breakpoints
- Mobile-first design
- Hero image: `width: min(640px, 92vw)` with `aspect-ratio: 1/1`
- Carousel: letterbox with fixed height

---

## 🤖 Chatbot AzA

- **Language support:** French (FR) · English (EN) · Yemba (YB)
- **FAQ database:** 40 questions × 3 languages = 120 entries
- **Voice:** Web Speech API (speech recognition + text-to-speech)
- **Categories:** 8 topic categories
- **Source file:** `src/js/chatbot.js` (~33 KB)

---

## 🌍 Multilingual Support

The site supports 3 languages via a custom language switcher:

| Code | Language | Region |
|------|----------|--------|
| `fr` | Français | Primary — Cameroun |
| `en` | English | International |
| `yb` | Yɛmba (Yemba) | Local — Menoua, Dschang |

Language switching updates `data-lang` on `<html>` and shows/hides elements with `lang-fr`, `lang-en`, `lang-yb` classes.

---

## 📊 Performance

| Asset | Size | Notes |
|-------|------|-------|
| `index.html` | ~156 KB | Self-contained (CSS + JS inline) |
| `style.css` | ~26 KB | Source file (not loaded at runtime) |
| `main.js` | ~15 KB | Source file (not loaded at runtime) |
| `chatbot.js` | ~33 KB | Source file (not loaded at runtime) |
| Images | ~25 files | Cached 1 year via Netlify headers |

---

© 2026 Serge Baresi Tessa · MRC Dschang · [tessa2026.netlify.app](https://tessa2026.netlify.app)
