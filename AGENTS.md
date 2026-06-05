# hsl_player — Sports Live Streaming App

## Git & Branch Restrictions
- NEVER write code, generate, or commit on `main`. READ-ONLY there. Prompt user to switch branches.

## Project Identity
- **Svelte 5** + **Vite** (not SvelteKit). Entrypoint: `src/main.js` uses `import { mount } from 'svelte'`.
- **Tailwind CSS 4** — uses `@import "tailwindcss"` / `@plugin` (NOT v3 `@tailwind` directives).
- **Hash-based routing** via `svelte-spa-router` — URLs are `#/play?eventId=X&matchId=Y`.
- **Firebase** (Firestore + Auth). Config from `VITE_FIREBASE_*` env vars. `.env` is committed.
- **hls.js** for HLS video playback.

## Commands
- `npm run dev` — dev server (already `--host`)
- `npm run build` — outputs to `dist/`
- `npm run preview` — preview production build
- **No lint, typecheck, or test scripts exist** in `package.json`. Do not run `npm test`, `npm run lint`, etc.

## Deployment
- **GitHub Pages** with custom domain (`worldcup2026live.xyz` via `CNAME` file).
- CI in `.github/workflows/main.yml`: pushes to `main` → `npm ci` → `npm run build` → deploy to Pages.

## Style
- Prettier configured with `prettier-plugin-svelte` (settings in `.prettierrc`).
- Formatting is manual (no `format` script).
