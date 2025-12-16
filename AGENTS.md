# Games On The Move – Codex Agent Guidelines

## Project Purpose & Context

This repository powers **Games On The Move** (formerly “tesla-games”):  
a content + affiliate site that helps people:

- Discover great **digital games** that work well on portable and at-home hardware (Steam Deck, Switch & Switch 2, ROG Ally, PCs, consoles, cloud, mobile).
- See **which platforms each game is available on**, and how well it runs on those platforms.
- Recreate or approximate **Tesla Arcade line-ups** on other devices where that’s useful.
- Buy games and hardware through trusted affiliate partners (Amazon, Green Man Gaming, Humble, etc.).
- Use guides and “setup recipes” to choose the best mix of platforms, accessories, and deals for their budget and play style.

The primary audiences are:
- Portable gaming users (Steam Deck, Switch / Switch 2, ROG Ally, handheld PCs, etc.).
- Players moving between platforms (for example, ex-Tesla owners replacing Tesla Arcade).
- Families and travellers wanting “games on the move” that fit real-life constraints (time, space, network, budget).


#### Tesla Section and Guide: 
As a content 'cluster' create a tesla arcade group of games and articles for 
- Ex-Tesla owners who miss the in-car games.
- Portable gaming users (Steam Deck, Switch, ROG Ally, etc.).
- Families and travellers wanting “games on the move”.
Help these audience members know how to:
- Recreate their Tesla Arcade games on **PC, Steam Deck, Switch, consoles, or cloud**.
- Discover which platforms each game is available on.
- Buy games and hardware through affiliate partners (Amazon, GMG, etc.).
- Use guides to choose the best portable / at-home setup for their budget and play style.


### What matters most

- Preserve the **“Games On The Move”** branding and tone: helpful, clear, semi-formal, not shouty.
- Keep the **game library**, **platform hubs**, and **guides** consistent and structured so we can scale SEO and affiliate integrations.
- Treat Tesla Arcade as an **important use-case but not the only one** – it’s fine to include games that were never in Tesla Arcade if they fit the portable / multi-platform focus.
- Don’t break existing routes or content schemas unless explicitly asked.

### Out of scope (important)

- Do **not** treat this as a general “family travel games” site.
- Do **not** add or recommend physical card/board/party games that aren’t part of a digital platform catalogue.
- Focus on **digital games and platforms only** (Steam, Switch, PlayStation, Xbox, mobile, cloud, etc.), especially in relation to Tesla Arcade equivalents.

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
## Architecture
Content model
	•	Games are content entries under src/content/games/ (e.g. you referenced src/content/games/2048.mdx).
	•	Games are driven by frontmatter tokens validated by src/content/config.ts.
	•	Guardrail: no schema shape changes for games unless explicitly part of an architect-approved slice.

Affiliate & store link system
	•	Affiliate links are centralised in src/lib/affiliates.ts, which assembles:
	•	store ordering + affiliate store set from src/data/stores.json  ￼
	•	per-game store configuration from src/data/game-links.json  ￼
	•	Amazon hardware deep-links from src/data/asins.json  ￼

stores.json contract
	•	Defines default store ordering and which stores are “affiliate” stores  ￼
	•	Carries partner IDs/codes (note: currently placeholders like YOUR_GMG_ID)  ￼

game-links.json contract
	•	Keyed by slug (e.g. vampire-survivors, 2048) and lists which stores to show, using query and optionally productId  ￼
	•	Also contains “hardware-like” entries for controllers that map to Amazon queries (useful precedent for hardware CTA patterns)  ￼

asins.json contract
	•	Maps hardware keys to ASINs for deep links  ￼

Guardrails
	•	No hard-coded affiliate URLs inside pages/components.
	•	To add or change store links for a game: edit src/data/game-links.json first.
	•	To add/adjust store ordering or affiliate designation: edit src/data/stores.json.
	•	To add hardware deep links: update src/data/asins.json.
  
  ## Architectural authority
	•	AGENTS.md is the source of truth for structure and guardrails.
	•	If a requested change conflicts with AGENTS.md, Codex must stop and ask.
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

## Content staging format (TSV workflow)

For scalable content production, Games On The Move uses a **content staging TSV** as an authoring and verification layer.

### Purpose
- Provide a single, reviewable source for:
  - editorial copy
  - platform availability flags
  - affiliate query inputs
  - cover image URLs
- Enable batch content creation without touching schemas or templates.

### Location
- TSV files live in the repo under `/content/` (or equivalent non-public directory).
- They are **not** shipped to the site and **not** read at runtime.

### Contract
- The TSV is **input-only**.
- Canonical site artefacts remain:
  - `src/content/games/<slug>.mdx`
  - `src/data/game-links.json`

### Codex responsibilities
- Read the TSV.
- Generate or update:
  - MDX game files that validate against `src/content/config.ts`
  - `game-links.json` entries (queries only for Slice 1).
- Do **not** introduce new schema fields.
- Do **not** wire TSV files into runtime code.

### Slice 1 constraints
- GMG + Amazon only.
- Queries only (no deep-link wiring yet).
- `coverImage` in MDX should use the TSV image URL when provided.