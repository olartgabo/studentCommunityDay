# Student Community Day

Static brand and landing preview for AWS Student Community Day at UPB Cochabamba.

## Project Structure

```text
.
├── index.html              # Entry hub
├── landing.html            # Applied event landing page
├── design-system.html      # Brand system reference
├── styles/
│   ├── tokens.css          # Global design variables
│   └── brand.css           # Shared utilities and brand patterns
├── scripts/
│   ├── config.js           # Public event configuration
│   └── apply-config.js     # Applies configuration to static HTML
├── docs/
│   └── design-system.md    # Short system notes
└── design-canvas.jsx       # Design canvas helper
```

## Editing Notes

- Change shared colors, spacing, radii, and layout values in `styles/tokens.css`.
- Add reusable visual helpers in `styles/brand.css`.
- Change event data in `scripts/config.js`.
- Keep page-specific layout in each HTML file.
- Do not put secrets in frontend config files.
- Open `index.html` in a browser to navigate the project.
