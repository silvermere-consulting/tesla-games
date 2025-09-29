# Tesla Games Starter (Astro + Tailwind)

A minimal site to help Tesla owners recreate their Tesla Arcade lineup on home platforms.
Includes:
- Game index
- Dynamic game pages with affiliate link helper
- Tailwind + static build

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
- Tesla is a trademark of Tesla, Inc.
