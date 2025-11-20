# Games On The Move – Codex Agent Guidelines

## Project Purpose & Context

This repository powers **Games On The Move** (formerly “tesla-games”):  
a content + affiliate site that helps people:

- Recreate their Tesla Arcade games on **PC, Steam Deck, Switch, consoles, or cloud**.
- Discover which platforms each game is available on.
- Buy games and hardware through affiliate partners (Amazon, GMG, etc.).
- Use guides to choose the best portable / at-home setup for their budget and play style.

The primary audiences are:
- Ex-Tesla owners who miss the in-car games.
- Portable gaming users (Steam Deck, Switch, ROG Ally, etc.).
- Families and travellers wanting “games on the move”.

### What matters most

- Preserve the **“Games On The Move”** branding and tone: helpful, clear, semi-formal, not shouty.
- Keep the **game library** and **guides** consistent and structured so we can scale SEO and affiliates.
- Don’t break existing routes or content schemas unless explicitly asked.

---

## Project Structure

Use this mental map when editing:

- `src/pages/`
  - Astro route files: `index.astro`, `games/index.astro`, `games/[slug].astro`, `guides/index.astro`, `compare/*`.
  - This is where layout and page-level structure live.

- `src/components/`
  - Shared UI: cards, lists, headers, affiliate CTAs (`AffiliateLinks.astro`, etc.).

- `src/content/`
  - Content collections (MDX/Markdown):
    - `games/` – per-game pages with frontmatter (title, tags, coverImage, platforms, notes).
    - `guides/` – long-form guides (e.g. Switch 2, Steam Deck vs PC, budget upgrade paths).

- `src/content/config.ts`
  - Content collection schemas. Changing this affects how MDX frontmatter must look.

- `src/data/`
  - Structured data powering listings:
    - `games.json` or similar – core game metadata.
    - `game-links.json`, `asins.json` – per-platform / per-store affiliate link data.

- `src/lib/`
  - Helper logic (e.g. affiliate link resolution, tag helpers, sorting utilities).

- `src/styles/global.css` and `tailwind.config.*`
  - Global styles and Tailwind configuration.

- `public/`
  - Static assets (images, favicon, etc.). Use this for game cover images and logos.

**Do not** edit build artefacts; they are generated and should be ignored:
- `dist/`
- `.astro/`
- `node_modules/`
- `node_modules/.vite/`
- `node_modules/.astro/`

---

## Build, Test, and Dev Commands

These are the only commands you should assume:

- `npm install` – install dependencies once.
- `npm run dev` – Astro dev server on `http://localhost:4321`.
- `npm run build` – production build; validates content collections and types.
- `npm run preview` – serve the built `dist/` for manual regression checks.
- `npx astro check` – optional schema + type check without building.

When you suggest changes that might break types or content schemas, **remind the user to run** `npm run build` or `npx astro check`.

---

## Coding & Content Style

- Use **TypeScript** for helpers (`.ts`) and ES module imports.
- Prefer `const` and small pure functions in `src/lib/`.
- Astro components:
  - Components: `PascalCase.astro`.
  - Routes: `kebab-case.astro` in `src/pages/`.
- Tailwind:
  - Keep utility classes inline in markup.
  - Only change config in `tailwind.config.*` when necessary.

### Games & Guides Content

- Game pages (`src/content/games/*.mdx`):
  - Keep consistent frontmatter: title, slug, tags, coverImage, Tesla vs platform notes, feature list, cross-save info.
  - Body content should follow a consistent structure: description, Tesla vs other platforms, features, “Play it on…” section with CTAs.

- Guides (`src/content/guides/*.mdx`):
  - Use headings (`##`) liberally for scannability.
  - Focus on **practical, step-by-step advice** (e.g. “If you sold your Tesla and want these 5 games back…”).
  - Where relevant, reference specific games by slug so they can be linked.

When asked to generate new guides or game pages, prefer **structured sections** over walls of text.

---

## Affiliates & Data Rules

- Affiliate logic should be centralised in `src/lib/affiliates.*` and data files in `src/data/`.
- Do not hard-code affiliate URLs directly into page components unless the user explicitly asks.
- When adding or changing affiliate data:
  - Update the relevant JSON (`game-links.json`, `asins.json`, etc.).
  - Ensure keys and structures remain consistent with current usage.
- Any new affiliate integration should:
  - Be easy to swap (e.g. via config or mapping).
  - Avoid leaking secrets or tokens into client-side code.

---

## Git, Files, and Safety

You are **not** responsible for running git commands; instead:

- You may **suggest** commands like `git status`, `git diff`, `git checkout`, `git reset --hard`, or `git push`, but **do not assume they’ve been run**.
- Never assume you can safely delete files outside `src/`, `src/content/`, `src/components/`, `src/lib/`, `src/data/`, and `public/` unless the user explicitly requests it.

Treat these as **read-only / generated** unless the user is doing infrastructure work:
- `dist/`
- `.astro/`
- `node_modules/`
- `.netlify/` (if present)

---

## How to Respond to the User

- Keep answers **code-focused but context-aware**:
  - Respect the “Games On The Move” brand and audience.
  - Aim for maintainable patterns, not just quick patches.
- When the user gives you a high-level goal (e.g. “sort low_priority games last”, “improve guides layout”), do this:
  1. Restate the goal briefly.
  2. Identify the most relevant files.
  3. Propose a concrete change (show diff or new code).
  4. Remind them of any follow-up checks (e.g. `npm run build`).

If the request is ambiguous, prefer to **propose a safe default** rather than inventing large new structures.