# Ezhilarasu E — Portfolio

A static personal portfolio site for Ezhilarasu E, SOC Analyst, built with plain HTML, CSS, and
JavaScript. No build step, no backend, no dependencies beyond Google Fonts — ready to deploy on
GitHub Pages as-is.

## Structure

```
portfolio/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── resume.pdf      (optional — add your own; site falls back gracefully if absent)
│   ├── profile.jpg      (optional — not currently used by the layout)
│   └── favicon.svg
└── README.md
```

## Running locally

Just open `index.html` in a browser — no server or build tools required.

## Deploying to GitHub Pages

1. Push this folder's contents to the root of a GitHub repository (e.g. `username.github.io`, or
   any repo with Pages enabled).
2. In the repository settings, enable **GitHub Pages** and point it at the branch/folder containing
   these files (typically `main` / `root`).
3. Your site will be live at `https://<username>.github.io/<repo>/`.

## Adding a resume

Drop a PDF at `assets/resume.pdf`. The "Download Resume" button checks for this file at load time —
if it's missing, the button automatically relabels itself to "Resume coming soon" so the site never
breaks or links to a missing file.

## Adding a profile photo

The hero section is designed to work fully without a photo. If you'd like to add one later, drop an
image at `assets/profile.jpg` and wire it into the hero markup in `index.html`.

## Notes

- Colors, spacing, and type scale are defined as CSS custom properties at the top of `css/style.css`
  for easy tweaking.
- Respects `prefers-reduced-motion` for all animation.
- No client data, credentials, or internal infrastructure details are included anywhere in the site.
