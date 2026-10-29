# Mihran Grigoryan — portfolio

Personal portfolio deployed at <https://m-grigoryan.github.io/> using GitHub Pages.

## Local setup

Use Node.js 22 or newer. No package installation or build step is required.

```sh
npm run dev
```

Open <http://127.0.0.1:5173>. `HOST` and `PORT` can override the preview address.
The preview serves only public site paths and is intended for local development.

## Architecture and layout

- `index.html`: deployment entry point, Tailwind configuration and initial scroll behavior.
- `assets/js/app.js`: React components and portfolio, certificate and tool data. Uses `React.createElement`, so no JSX compilation is needed.
- `assets/css/site.css`: custom styling and responsive rules. CSS image URLs are relative to this file.
- `assets/`: images grouped into hero, projects, certifications, icons and favicon folders. JavaScript image paths resolve relative to `index.html`.
- `server.mjs`: dependency-free local preview server.
- `tests/`: Node test runner checks for missing assets and preview routing regressions.
- `docs/`: maintenance notes and audit evidence.
- `Website Portfolio/index.html`: compatibility redirect for the former duplicate site URL.
- `.github/workflows/test.yml`: pull request and main-branch checks.

React 19, React DOM and Lucide icons load as ES modules from esm.sh. Tailwind loads from its existing CDN. Internet access is required for those dependencies; there is no local bundle. The unused npm dependencies were removed to avoid suggesting a build pipeline that this site does not use.

## Validation

```sh
npm test
node --check assets/js/app.js
```

Also check desktop and mobile navigation, each project gallery, dialog Escape/Tab behavior, contact links and images in a browser. Automated checks do not replace browser testing.

## Deployment and maintenance

Keep `index.html` and `assets/` at the repository root so existing Pages paths continue working. This change does not alter Pages settings or add a deployment workflow. Changes reach the live site through the existing Pages configuration after merging a pull request.

Edit the canonical files only. Duplicate legacy assets were byte-identical and consolidated; the historical variant remains in Git history. An unverified Atlassian credential URL is intentionally absent: supply the actual credential URL in the certification data when known. See [audit notes](docs/audit.md) for scope and remaining limitations.
