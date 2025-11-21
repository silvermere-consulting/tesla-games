# Games On The Move (Astro + Tailwind)

A portable-gaming focused Astro starter that began life as a Tesla Arcade companion. It now powers **gamesonthemove.com** – a site that helps people rebuild their libraries across Tesla, Steam Deck, Switch, cloud, and travel setups.

Includes:
- Game index powered by Markdown/MDX content collections
- Dynamic game pages with affiliate link helper
- Tailwind + static build ready for Netlify or Vercel

## macOS Quick Start

1) Install Node.js 20 (via Homebrew):
   ```bash
   brew install node git
   node -v
   npm -v
   ```

2) Install dependencies:
   ```bash
   npm install
   ```

3) Run locally:
   ```bash
   npm run dev
   # open the URL it prints, typically http://localhost:4321
   ```

4) Build:
   ```bash
   npm run build
   npm run preview
   ```

5) Deploy options:

   **Netlify (recommended for static):**
   - Create a free Netlify account.
   - Install CLI: `npm i -g netlify-cli`
   - Run: `netlify init` (select "deploy existing project", build command: `npm run build`, publish directory: `dist`)
   - Deploy: `netlify deploy --prod`

   **Vercel:**
   - Create a free Vercel account.
   - Install CLI: `npm i -g vercel`
   - Run: `vercel` and follow prompts (build command `npm run build`, output `dist`).

## Affiliate IDs
Edit `src/lib/affiliates.ts` and replace `XXXX` placeholders with your IDs/codes.

## Add a Game
Add a new object to `src/data/games.json` with:
- slug, name
- tesla_status, notes
- platforms[]
- controller_required (true/false)
- setup: { pc?: string[], switch?: string[], ps?: string[], xbox?: string[] }

## Notes
- This project avoids grey-market key sellers; only link authorised stores.
- Tesla is a trademark of Tesla, Inc. Games On The Move is an independent guide.
