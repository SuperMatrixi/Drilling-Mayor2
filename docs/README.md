# 🚀 README – Déploiement Dschang 2026 · v6.0
**Serge Baresi Tessa – Opération Ville Propre · tessa2026.netlify.app**
Mise à jour : Avril 2026

---

## 📁 Fichiers à déployer (v6)

```
Drilling-Mayor2/
├── src/
│   ├── index.html          ← Application web principale (~156 KB)
│   ├── js/
│   │   ├── chatbot.js      ← Chatbot AzA (40 FAQ x 3 langues)
│   │   └── main.js         ← Navigation, carousel, formulaires, météo
│   └── css/
│       └── style.css       ← Feuille de styles principale
└── assets/images/          ← 25 images (voir CONTENT.md)
    ├── hero/               ← TeamMRC.jpg ✅ déjà fournie
    ├── blog/               ← pdf-challlenge.png
    ├── press/              ← 7 images presse
    ├── carousel/           ← 15 images carousel
    └── logos/              ← logo-dschang2026.png · logo-mrc.png
```

> ⚠️ **Important** : Pour le déploiement Netlify, les images doivent se trouver dans `src/assets/images/` (le dossier `publish` est `src`). Le dossier racine `assets/images/` sert à organiser et pré-trier vos images avant de les déplacer vers `src/assets/images/`.

---

## ▶️ Mise à jour Netlify

### Drag & Drop (le plus simple — 30 secondes)
1. Assurez-vous que le dossier `src/` contient `index.html` et les images dans `src/assets/images/`
2. Glissez le dossier `src/` sur [netlify.com](https://netlify.com) → Deploy manually
3. ✅ En ligne immédiatement

### GitHub (si connecté)
1. Pushez vos changements sur le repo GitHub
2. Netlify redéploie automatiquement depuis le dossier `src/` en ~60 secondes

---

## ✅ Correctifs v6 appliqués

| Fix | Détail |
|---|---|
| 🖼️ Blog thumbnail | `pdf-challlenge.png` s'affiche entière en **letterbox noir** (220px, `object-fit:contain`, `background:#000`) |
| ✍️ Blog sous-titre | *"Actualités, formations et l'Opération Ville Propre à Dschang 2026/27."* (FR · EN · Yemba) |
| 📰 Ordre presse | Plus récent en haut (QuotientLife Avr 2026) → plus ancien en bas (Point Afrique) |

---

## 📸 Images — aucune nouvelle image en v6

Toutes les images sont inchangées depuis v5. Si `pdf-challlenge.png` n'affiche pas encore l'image correcte, c'est qu'elle n'est pas encore placée dans `src/assets/images/`. Le fallback affiche 🧠 automatiquement.

---

## ✅ Checklist complète (v6)

**Images à placer dans `src/assets/images/` si pas encore fait :**
- [ ] `TeamMRC.jpg` ✅ déjà fournie
- [ ] `pdf-challlenge.png` ← poster formation Baffoussam
- [ ] `press-fb-portrait.png` ← vignette QuotientLife
- [ ] 22 autres images (voir CONTENT.md)

**Vérifications :**
- [ ] Hero TeamMRC.jpg s'affiche en carré sans barres noires
- [ ] Blog thumbnail `pdf-challlenge.png` s'affiche avec barres noires élégantes
- [ ] Presse : QuotientLife en 1ère position, Point Afrique en dernière
- [ ] Blog sous-titre : *"Opération Ville Propre à Dschang 2026/27"*
- [ ] "Lire la suite" fonctionne sur le blog post
- [ ] Ticker défile avec l'événement du 11 Avril
- [ ] Chatbot AzA répond en FR · EN · Yemba
- [ ] Formulaires Netlify activés

---

## 📊 Historique des versions

| Version | Date | Changements clés |
|---|---|---|
| v1 | Mar 2026 | Site initial |
| v2 | Mar 2026 | Corrections SVG, carousel letterbox |
| v3 | Avr 2026 | OVP, Yemba, AzA chatbot trilingue |
| v4 | Avr 2026 | Ticker, YouTube autoplay, blog section |
| v5 | Avr 2026 | Hero image fix (aspect-ratio), QuotientLife, WA canal |
| **v6** | **Avr 2026** | **Blog thumb letterbox, sous-titre, ordre presse** |

---

© 2026 Serge Baresi Tessa · MRC Dschang · tessa2026.netlify.app
