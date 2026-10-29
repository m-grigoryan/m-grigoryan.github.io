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

## Visual refinement requested after review

- Replaced the square brand artwork with an original transparent SVG monogram.
- Blended the portrait edges with CSS masks, removing the hard image boundary without changing the portrait file.
- Refined navigation and heading typography, added layered blue/purple ambient backgrounds, and aligned matching outline contact icons to the left of the portfolio action.
- Unified all certificate cards (including the unlinked Atlassian card), removed dark square badge corners using presentation styles, and stacked all five cards in one column on mobile.
- Replaced the Google Workspace category logo with the same purple outline icon treatment used by the other tool categories.
- Browser review at 1440px, 390px and 320px confirmed layout and no horizontal overflow on the narrow screens; no broken loaded images were found at 390px. Asset-reference, syntax and whitespace checks passed. The HTTP server integration test could not rerun in the current restricted session because opening a port returned EPERM; the unchanged server test passed in the initial audit.
