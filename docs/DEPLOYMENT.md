# 🚀 DEPLOYMENT GUIDE – Dschang 2026

**Serge Baresi Tessa – Opération Ville Propre**
Site: [tessa2026.netlify.app](https://tessa2026.netlify.app) · Mise à jour : Avril 2026

---

## 📋 Prerequisites

- GitHub account with access to [SuperMatrixi/Drilling-Mayor2](https://github.com/SuperMatrixi/Drilling-Mayor2)
- Netlify account connected to the repository
- Your images and assets ready for upload

---

## 🗂️ Publish Directory

The Netlify publish directory is set to `src/` in `netlify.toml`.

```toml
[build]
  publish = "src"
```

This means:
- `src/index.html` is served at `https://tessa2026.netlify.app/`
- Images at `src/assets/images/` are served at `/assets/images/`
- CSS at `src/css/` is served at `/css/`
- JS at `src/js/` is served at `/js/`

> ℹ️ The root `assets/images/` folders (hero/, blog/, press/, carousel/, logos/) are for **organizing and staging your images before deploying**. Once ready, copy images to `src/assets/images/` for Netlify to serve them.

---

## 📸 Adding Images

### Step 1 – Organize your images
Place your images in the appropriate subfolder under the root `assets/images/`:

| Folder | Purpose | Example files |
|--------|---------|---------------|
| `assets/images/hero/` | Main hero/cover images | `TeamMRC.jpg` |
| `assets/images/blog/` | Blog post thumbnails | `pdf-challlenge.png` |
| `assets/images/press/` | Press/media coverage | `press-fb-portrait.png` |
| `assets/images/carousel/` | Gallery carousel slides | `SergeTessa4.jpg` |
| `assets/images/logos/` | Logo files | `logo-mrc.png` |

### Step 2 – Move images to the deploy folder
For images to be served by Netlify, they must be in `src/assets/images/`:

```bash
cp assets/images/hero/TeamMRC.jpg src/assets/images/TeamMRC.jpg
# or copy all:
cp -r assets/images/hero/* src/assets/images/
cp -r assets/images/blog/* src/assets/images/
# etc.
```

### Step 3 – Commit and push
```bash
git add src/assets/images/
git commit -m "Add images: [description of images added]"
git push origin main
```

Netlify will automatically redeploy in ~60 seconds.

---

## ▶️ Deployment Methods

### Method 1: GitHub Auto-Deploy (Recommended)
1. Push changes to the `main` branch on GitHub
2. Netlify detects the push and automatically redeploys from `src/`
3. ✅ Live in ~60 seconds at [tessa2026.netlify.app](https://tessa2026.netlify.app)

### Method 2: Manual Drag & Drop
1. Open [netlify.com](https://netlify.com) → Your site dashboard
2. Go to **Deploys** tab
3. Drag and drop the `src/` folder onto the deploy area
4. ✅ Live immediately

### Method 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir=src --prod
```

---

## ✅ Post-Deployment Checklist

- [ ] `src/assets/images/TeamMRC.jpg` present → Hero image displays correctly
- [ ] All 25 images placed in `src/assets/images/`
- [ ] Netlify Forms enabled in dashboard (Settings → Forms)
- [ ] YouTube video IDs verified in `src/js/main.js` (array `VIDEOS`)
- [ ] Test all 3 languages: FR · EN · YB (Yemba)
- [ ] Chatbot AzA responds to 40 FAQ in 3 languages
- [ ] Ticker displays upcoming events
- [ ] WhatsApp Canal link works: [https://whatsapp.com/channel/0029VbCKj2OEawdoijYhH71r](https://whatsapp.com/channel/0029VbCKj2OEawdoijYhH71r)
- [ ] Schema.org validation: [validator.schema.org](https://validator.schema.org)

---

## 🔧 Netlify Configuration Summary

| Setting | Value |
|---------|-------|
| **Publish directory** | `src` |
| **Build command** | *(none – static site)* |
| **SPA redirects** | `/* → /index.html` (200) |
| **Image cache** | 1 year (immutable) |
| **CSS/JS cache** | 24 hours |
| **Security headers** | DENY frame, nosniff, strict referrer |

---

## 📊 Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| v1 | Mar 2026 | Initial site |
| v2 | Mar 2026 | SVG fixes, carousel letterbox |
| v3 | Apr 2026 | OVP section, Yemba language, AzA chatbot trilingual |
| v4 | Apr 2026 | Ticker, YouTube autoplay, blog section |
| v5 | Apr 2026 | Hero image fix (aspect-ratio), QuotientLife press, WhatsApp canal |
| **v6** | **Apr 2026** | **Blog thumb letterbox, subtitle update, press chronological order** |

---

© 2026 Serge Baresi Tessa · MRC Dschang · [tessa2026.netlify.app](https://tessa2026.netlify.app)
