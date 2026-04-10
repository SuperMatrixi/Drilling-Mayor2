# 🗺️ MINDMAP – Dschang 2026 · v6.0
**Serge Baresi Tessa – Opération Ville Propre · Le Maire aux 100 Forages**
tessa2026.netlify.app · Mise à jour : Avril 2026

---

## 📁 Structure canonique (v6)

```
dschang2026/
├── index.html              ← SPA v6 (~154 KB, tout inline)
├── netlify.toml            ← Cache, headers, redirections
├── README.md               ← Guide déploiement v6
├── MINDMAP.md              ← Ce fichier
├── CONTENT.md              ← Textes trilingues FR · EN · Yemba
└── assets/
    ├── images/             ← 25 images (1 fournie + 24 placeholders)
    │   ├── TeamMRC.jpg     ✅ FOURNIE 2000×2000 px
    │   ├── pdf-challlenge.png  ← Blog post #1 thumbnail
    │   ├── press-fb-portrait.png ← Presse QuotientLife
    │   └── [22 autres images — voir CONTENT.md]
    └── [CSS + JS intégrés dans index.html]
```

---

## 🖥️ Sections du site (ordre vertical v6)

| # | Section | ID | Statut v6 |
|---|---|---|---|
| 0 | Ticker | `#news-ticker` | ✅ Événement 11 Avr Baffoussam |
| 0b | Top Bar | — | FB · YT · IG · FR/EN/YB |
| 1 | Nav | `#main-nav` | ✅ GALERIE·PRESSE·PROJET·VIDÉO·**BLOG**·VISION·Rejoindre |
| 2 | Hero | `#hero` | ✅ v6 : aspect-ratio:1/1, cover, 640px |
| 3 | Galerie | `#photo` | 16 slides letterbox |
| 4 | Presse | `#presse` | ✅ v6 : 7 cartes, ordre chronologique inversé |
| 5 | Forages | `#forages` | 100 Forages, 3 phases |
| 6 | Vidéo | `#video` | YouTube autoplay |
| 7 | Blog | `#blog` | ✅ v6 : subtitle mis à jour, thumbnail letterbox |
| 8 | Vision | `#vision` | 6 piliers |
| 9 | Contact | `#contact` | 2 formulaires + lien WA canal |
| 10 | Footer | — | + Blog dans navigation |
| F | Chatbot AzA | `#AzA-widget` | FR·EN·Yemba · voix |

---

## 🆕 Correctifs v6

### 1. Blog thumbnail — letterbox `pdf-challlenge.png`
- **Avant :** hauteur 200px, `object-fit:contain` mais `background:#001a0d`
- **Après :** hauteur **220px**, `object-fit:contain`, `background:#000` (noir pur)
- L'image s'affiche entière avec barres noires propres en haut/bas ou gauche/droite

### 2. Blog sous-titre mis à jour
- **Avant :** *"Actualités, formations et initiatives de la campagne Dschang 2026."*
- **Après :** *"Actualités, formations et l'Opération Ville Propre à Dschang 2026/27."*
- Mis à jour en FR · EN · Yemba

### 3. Revue de Presse — ordre chronologique inversé (plus récent en haut)
```
#1  QuotientLife           Avril 2026    ← LE PLUS RÉCENT
#2  Instagram Reel #1      2026
#3  Instagram Reel #2      2026
#4  MenouActu Facebook     Février 2026
#5  MRC Dschang Officiel   Février 2026
#6  MenouActuWeb           Janvier 2026
#7  Point Afrique          2026          ← LE PLUS ANCIEN
```

### 4. Hero image (v5 → maintenu en v6)
- `aspect-ratio:1/1` · `width:min(640px,92vw)` · `object-fit:cover` · `object-position:center top`
- Affiche parfaitement `TeamMRC.jpg` (2000×2000 px) sans barres noires

---

## 🎨 Design System (inchangé)

| Variable | Valeur | Usage |
|---|---|---|
| `--green` | `#006633` | Principale |
| `--green-dark` | `#004422` | Top bar, nav |
| `--gold` | `#D4AF37` | Accents, badges |
| Chatbot AzA | `#0077cc` / `#00468b` | Goutte bleue souriante |
| Blog thumb bg | `#000` | Barres noires letterbox |
| Hero bg | `#001a0d` | Fallback + glow |

---

## 🔗 Liens clés

| Service | URL |
|---|---|
| Site | https://tessa2026.netlify.app/ |
| YouTube | https://www.youtube.com/@DSCHANG2026 |
| Facebook | https://www.facebook.com/people/Serge-Baresi-Tessa/61578157994450/ |
| Instagram | https://www.instagram.com/dschang2026/ |
| WhatsApp Canal | https://whatsapp.com/channel/0029VbCKj2OEawdoijYhH71r |
| QuotientLife | https://www.facebook.com/share/v/18jarPDSTD/ |

---

© 2026 Serge Baresi Tessa · MRC Dschang · Opération Ville Propre
