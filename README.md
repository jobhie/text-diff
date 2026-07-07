# Text Diff

A Chrome browser extension for side-by-side text comparison — powered by **Monaco Editor** (the engine behind VS Code) and **Vue 3**, built with **Vite**.

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![license](https://img.shields.io/badge/license-AGPL--3.0-green.svg)

---

## Overview

Text Diff gives you a full-page, dual-pane diff editor right in your browser. Paste or type text into the **Original** and **Modified** panels, and Monaco's built-in diff engine highlights every insertion, deletion, and change in real time.

Click the extension toolbar icon → a new tab opens with the diff tool — no permissions needed, no data leaves your machine.

---

## Features

- **Side-by-side diff** — Monaco's `DiffEditor` computes and displays differences as you type.
- **Editable both sides** — Unlike many diff tools, both the original and modified panes are fully editable.
- **Real-time feedback** — Changes are reflected instantly with color-coded highlighting.
- **Dark / Light theme** — Toggle between dark and light modes. Persists to `localStorage` and respects OS `prefers-color-scheme`.
- **Zero permissions** — The extension requests no Chrome permissions. No network access, no storage access.
- **Works offline** — Everything runs locally; no server required.

---

## Screenshot

```
┌─────────────────────────────────────────────────┐
│  ● Text Diff                    [Switch to Dark] │
├──────────────────────┬──────────────────────────┤
│  Original            │  Modified                │
│  ┌────────────────┐  │  ┌────────────────────┐  │
│  │ The quick      │  │  │ The **fast**       │  │
│  │ brown fox      │  │  │ brown fox          │  │
│  │ jumps over     │  │  │ **leaps over**     │  │
│  │ the lazy dog   │  │  │ the lazy **cat**   │  │
│  └────────────────┘  │  └────────────────────┘  │
│  [Diff highlights]   │  [Diff highlights]       │
└──────────────────────┴──────────────────────────┘
```

*(Monaco renders added/removed/changed lines with distinct background colors.)*

---

## Tech Stack

| Technology | Role |
|------------|------|
| [Vue 3](https://vuejs.org/) (Composition API) | Reactive UI framework |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Text diff engine & editor widget |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| Chrome Extension (Manifest V3) | Browser integration |

---

## Project Structure

```
text-diff/
├── src/
│   ├── main.js                 # Vue app entry point
│   ├── App.vue                 # Root component (toolbar + theme toggle)
│   ├── monaco-setup.js         # Monaco web worker configuration
│   ├── components/
│   │   └── DiffEditor.vue      # Monaco DiffEditor wrapper
│   └── composables/
│       └── useTheme.js         # Dark/light theme composable
├── scripts/
│   ├── copy-extension-files.mjs # Post-build: copies extension assets to dist/
│   └── generate-icons.mjs      # Generates PNG icons programmatically
├── icons/                      # Extension toolbar icons (16 / 48 / 128 px)
├── background.js               # Service worker — opens extension on click
├── manifest.json               # Chrome Manifest V3 declaration
├── index.html                  # SPA shell
├── vite.config.js              # Vite configuration
├── package.json
└── LICENSE
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (ships with Node.js)

### Development

```bash
npm run dev
```

Starts the Vite dev server (usually at `http://localhost:5173`). Open the URL in a browser to use the diff tool with hot-module replacement.

### Production Build (Chrome Extension)

```bash
npm run build
```

This produces a ready-to-load Chrome extension in the `dist/` directory.

1. Open `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right)
3. Click **Load unpacked**
4. Select the `dist/` folder

Click the extension's toolbar icon, and the diff tool opens in a new tab.

### Generate Icons

```bash
npm run icons
```

Regenerates `icons/icon-{16,48,128}.png` (solid-blue PNGs, no external dependencies).

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Bundle the app, then copy extension files to `dist/` |
| `npm run icons` | Generate toolbar icon PNGs |

---

## License

[AGPL-3.0](LICENSE) — Free to use, modify, and distribute. Any derivative work must also be open source under the same license.

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
