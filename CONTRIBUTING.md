# 🤝 Contributing to Drilling-Mayor2

Thank you for your interest in contributing to the **Opération Ville Propre – Dschang 2026** project!
We welcome contributions of all kinds — content updates, bug fixes, translations, and documentation improvements.

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
3. [Commit Message Format](#commit-message-format)
4. [Pull Request Process](#pull-request-process)
5. [Code Standards](#code-standards)
6. [Reporting Issues](#reporting-issues)

---

## 🚀 Getting Started

### Prerequisites
- Git installed on your machine
- GitHub account with access to the repository

### Setup
```bash
# Clone the repository
git clone https://github.com/SuperMatrixi/Drilling-Mayor2.git
cd Drilling-Mayor2

# Create a new branch for your changes
git checkout -b feature/your-description
# or
git checkout -b fix/issue-description
```

---

## 🛠️ How to Contribute

### Content Updates
- **Text changes** — Edit the relevant section in `src/index.html`
- **New images** — Add to `assets/images/<category>/` then copy to `src/assets/images/`
- **Documentation** — Edit files in `docs/`

### Adding Images
1. Identify the correct subfolder: `hero/`, `blog/`, `press/`, `carousel/`, or `logos/`
2. Place your image in `assets/images/<category>/your-image.jpg`
3. Copy to `src/assets/images/your-image.jpg` (required for deployment)
4. Follow naming conventions: lowercase, hyphens, no spaces (e.g., `serge-tessa-2026.jpg`)

### Bug Fixes
1. Open an issue first using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
2. Reference the issue number in your PR

---

## 📝 Commit Message Format

Use clear, descriptive commit messages following this format:

```
<type>: <short description>

[optional body with more details]
```

### Types
| Type | When to use |
|------|------------|
| `feat` | New feature or content |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | CSS/visual changes (no logic change) |
| `refactor` | Code restructuring |
| `assets` | Adding or updating images |
| `chore` | Maintenance (dependencies, config) |

### Examples
```bash
git commit -m "assets: add press images for QuotientLife coverage"
git commit -m "fix: correct Yemba translation in chatbot response #12"
git commit -m "feat: add new carousel slide for April 11 event"
git commit -m "docs: update DEPLOYMENT.md with new image paths"
```

---

## 🔀 Pull Request Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-description
   ```

2. **Make your changes** and test locally if possible

3. **Commit your changes** with descriptive messages

4. **Push to GitHub**:
   ```bash
   git push origin feature/your-description
   ```

5. **Open a Pull Request** on GitHub:
   - Use a clear title describing the change
   - Reference any related issues (`Closes #123`)
   - Add a brief description of what changed and why

6. **Request review** from the repository maintainer

7. **Address feedback** — respond to review comments and update your PR

---

## 📐 Code Standards

### HTML
- Use semantic HTML5 elements
- Keep `lang-fr`, `lang-en`, `lang-yb` classes for trilingual content
- Follow existing indentation (2 spaces)

### CSS
- Use CSS custom properties (variables) for colors: `var(--green)`, `var(--gold)`, etc.
- Mobile-first responsive design
- Follow BEM-like naming where applicable

### JavaScript
- ES6+ syntax (`const`, `let`, arrow functions, template literals)
- Keep functions small and focused
- Comment complex logic

### Images
- **Format:** JPG for photos, PNG for graphics/logos
- **Naming:** lowercase with hyphens — `hero-dschang.jpg` not `HeroDschang.jpg`
- **Size:** Under 5 MB per image
- **Resolution:** Max 2000×2000 px for photos

---

## 🐛 Reporting Issues

Found a bug? Please use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) to open an issue.

For general questions or suggestions, open an issue with the label `question` or `enhancement`.

---

## 🌍 Language Support

This project uses 3 languages. When updating text content:
- Always provide translations in all 3 languages: **FR · EN · Yemba**
- See [docs/YEMBA_LANGUAGE_GUIDE.md](docs/YEMBA_LANGUAGE_GUIDE.md) for Yemba language reference
- Use `lang-fr`, `lang-en`, `lang-yb` CSS classes for language switching

---

## 📞 Contact

Questions? Reach out through:
- **GitHub Issues** — for technical issues
- **WhatsApp Canal** — [Canal JMRC/YCRM](https://whatsapp.com/channel/0029VbCKj2OEawdoijYhH71r)

---

© 2026 Serge Baresi Tessa · MRC Dschang · Opération Ville Propre
