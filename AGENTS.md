# Agent guidance

## Scope

Work only in `m-grigoryan/m-grigoryan.github.io` for portfolio maintenance. Use a feature branch and pull request. Do not push directly to main or change deployment settings without an explicit request.

## Orientation

Read README.md and docs/audit.md first. The deployment entry point is root index.html; application code and data live in assets/js/app.js and styling in assets/css/site.css. This is a browser ES-module site without a build step. Keep React.createElement syntax and existing CDN imports unless intentionally migrating the architecture.

## Safe edits

- Keep root deployment paths stable. Resolve JavaScript image URLs against the document and CSS URLs against the stylesheet.
- Keep assets grouped by purpose. Do not recreate a second full website under Website Portfolio; its entry is a compatibility redirect.
- Preserve portfolio content and visual design unless the task calls for changes. Never invent project claims, credentials or URLs.
- For interactive controls, maintain accessible labels, keyboard operation, dialog focus containment and focus restoration.
- Do not add secrets, generated dependencies, screenshots or temporary browser profiles to Git.

## Verification

Run npm test and node --check assets/js/app.js. Start npm run dev and check affected behavior in a browser, including narrow/mobile layout for responsive changes. Check project dialogs with Tab, Shift+Tab and Escape. Inspect console errors and missing images. Add meaningful regression coverage for verified bugs. Report any checks that could not run and distinguish local changes from the still-unmerged deployed site.
