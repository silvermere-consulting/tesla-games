 # Repository Guidelines

## Project Structure & Module Organization
Tesla Games Starter is an Astro 5 + Tailwind site that renders Tesla Arcade-style listings. Route files live in `src/pages` (`index.astro`, `games/[slug].astro`, guides, compare). Shared UI/SEO helpers sit in `src/components`, while collection schemas are described in `src/content/config.ts` and the corresponding MDX/Markdown content resides under `src/content/games` and `src/content/guides`. Structured data powering listings is in `src/data/games.json`, and affiliate helpers live in `src/lib`. Site-wide styles live in `src/styles/global.css`, static assets go in `public/`, and the generated `dist/` directory should only be touched by the build.

## Build, Test, and Development Commands
Install dependencies once with `npm install`.
- `npm run dev` – starts Astro on http://localhost:4321 with hot reload and validates content collections.
- `npm run build` – runs the Astro static build, compiles Tailwind via the plugin, and surfaces schema/content errors.
- `npm run preview` – serves the built `dist/` directory to spot regressions before deploying.
- `npx astro check` – optional type+schema check to catch frontmatter drift without doing a full build.

## Coding Style & Naming Conventions
Use TypeScript modules with ES imports, two-space indentation, and prefer `const` plus arrow functions for utilities (see `src/pages/index.astro`). Component filenames are `PascalCase.astro`, helper files `camelCase.ts`, routes `kebab-case.astro`, and slugs in `games.json` must match directory names under `src/content`. Tailwind utility classes should remain in markup; add new design tokens by extending `tailwind.config.cjs` or `src/styles/global.css`. Update affiliate IDs only inside `src/lib/affiliates.ts`.

## Testing Guidelines
Automated tests are not yet wired up, so treat `npm run build` as the regression gate—it lints Astro, validates content collections, and fails on type/schema mismatches. After build success, run `npm run preview` and manually smoke-test the homepage sorting (feature guides first, low-priority set last), a few `/games/{slug}` pages, and any guides touched. When altering assets or layout, test at narrow and wide breakpoints because Tailwind classes assume responsive grids.

## Commit & Pull Request Guidelines
Recent history favors short, sentence-case summaries (“updated header for viewport…”). Follow that style, keep the imperative mood, and mention the surface touched (e.g., “adjust guide cards for featured tags”). Every PR should describe the intent, list test/build evidence, link any issue, and include screenshots or terminal output if you changed UI or data ordering. Verify `npm run build` locally before requesting review, avoid committing `dist/`, and call out modifications to `src/data/games.json` so reviewers can double-check content accuracy.
