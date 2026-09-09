# Imagen Prompt Generator

Structured prompt creation for Imagen, Midjourney, DALL-E, and Stable Diffusion. The MVP is client-first: prompt history and favorites stay in browser storage, while AI enhancement is proxied through a Cloudflare Pages Function.

## Local development

```bash
npm install
npm run dev
```

Checks available through `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

## Deployment

Connect this repository to Cloudflare Pages with build command `npm run build` and output directory `dist`. Add `GEMINI_API_KEY` as an encrypted Production and Preview environment variable in the Cloudflare dashboard. Never put that value in `.env` committed to GitHub.

The `/functions/api/enhance-prompt.ts` endpoint validates and sanitizes input, applies a lightweight per-IP rate limit, and keeps the Gemini key server-side.

## Quality and security

Run the full local gate before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The test suite covers prompt formatting, deterministic variations, Local Storage CRUD/FIFO behavior, enhancer success/error/timeout/rate-limit paths, and the empty builder state. The client uses same-origin `/api/enhance-prompt`; the Gemini secret is read only from the Pages Function environment. `.env` files are ignored and `.env.example` contains no secret.

For release QA, exercise the four PRD journeys at desktop, tablet, and 360px mobile widths. Verify keyboard focus order, screen-reader labels, clipboard confirmation, manual builder behavior when the enhancer returns 4xx/5xx/timeout, and history deletion confirmation. Cloudflare Preview Deployments should be used for Pages Function and real Gemini integration checks.

## Contributing

Create a focused branch, run the local quality gate, and open a pull request against `main`. Production deployment is intended to run through Cloudflare Pages after required review. Configure branch protection and required PR review in the GitHub repository settings.

## Structure

- `src/lib`: prompt types, model presets, formatter, and local storage
- `src/store`: Zustand form state
- `src/App.tsx`: responsive builder, preview, enhancer flow, and library
- `functions/api`: Cloudflare Pages Functions
- `.github/workflows/ci.yml`: lint, typecheck, test, and PR verification

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
