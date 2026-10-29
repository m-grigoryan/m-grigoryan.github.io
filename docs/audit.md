# Portfolio maintenance audit — 2026-10-29

## Evidence and changes

- The deployed homepage loaded and rendered portfolio, certifications, tools and contact sections.
- Opening Sport Betting left keyboard focus on its background card. Escape did not dismiss the modal. Added dialog semantics, initial focus, background inertness, a Tab loop, Escape dismissal and focus restoration. Gallery thumbnails now have distinct image-number labels and selected state.
- The Atlassian certificate pointed to `#replace-with-atlassian-credential-url`, which has no target. Kept the certificate content as a non-link until a verified credential URL is available.
- The repository contained a second complete website under Website Portfolio. Its assets and package/server files matched their root equivalents byte for byte; its HTML was an older logo variant. Consolidated assets into the root tree and retained the legacy entry URL as a redirect preserving query and hash. Previous HTML remains in Git history.
- Extracted application JavaScript and custom CSS from the large entry page. Updated CSS image paths for the new stylesheet location.
- The local server served arbitrary repository files, including .git metadata, and lacked WebP content typing. Limited it to public site paths, checked resolved paths, handled malformed URLs, added HEAD/method handling and WebP typing.
- Removed unused npm dependencies. The actual application continues using its existing CDN imports.

## Limits

This is a targeted maintenance audit, not a guarantee that every possible defect has been found. External credential destinations and contact actions were not submitted. The live website remains unchanged until this pull request is merged and Pages deploys. CDN availability remains an external runtime dependency; replacing the CDN setup with a bundled build is a separate migration.

## Validation results

- Node tests: 2 passed (asset references; HTTP routes, methods, private-file and encoded-traversal rejection).
- JavaScript syntax check and git diff whitespace check passed.
- Local browser: dialog initial focus, Shift+Tab/Tab wrap, next-image selection, Escape dismissal and trigger focus restoration passed. No console errors observed.
- 390px mobile browser: menu opened, portfolio navigation closed the menu, no horizontal document overflow and no broken loaded images observed.
