# Cloudflare Pages Deployment

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

## Live Deployment

- **Production URL**: <https://paxonhuang.pages.dev>
- **Preview URL** (this branch deployment): <https://a7c8921a.paxonhuang.pages.dev>

## Deployment Architecture

```
GitHub (main branch) ─push─► GitHub Actions ─build─► Cloudflare Pages
                              (npm ci / npm run build)        │
                                                              ▼
                                                       https://paxonhuang.pages.dev
```

### Files involved

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Wrangler config — declares the Pages project name (`paxonhuang`) and build output directory (`./dist`) |
| `.github/workflows/deploy.yml` | GitHub Actions workflow — builds the Astro site and uploads `dist/` to Cloudflare Pages |
| `astro.config.mjs` | Astro config — React + Tailwind v4 integrations; default output dir is `dist/` |
| `package.json` | Build script — `astro build` |

## Setup (one-time)

### 1. Create the Cloudflare Pages project

Either create it through the Cloudflare Dashboard:
- Workers & Pages → Create application → Pages → Connect to Git → select `PaxonHuang/PaxonHuang`
- Project name: `paxonhuang`
- Build command: `npm run build`
- Build output directory: `dist`

…or it will be auto-created the first time the GitHub Action runs (with `cloudflare/pages-action@v1`).

### 2. Generate a Cloudflare API Token

1. Go to <https://dash.cloudflare.com/profile/api-tokens>
2. Click **Create Token** → use the **Edit Cloudflare Pages** template, or create a custom token with:
   - `Account → Cloudflare Pages: Edit`
   - `Account → Account Settings: Read` (optional)
3. Copy the token.

### 3. Get your Cloudflare Account ID

1. Go to <https://dash.cloudflare.com>
2. On the Workers & Pages overview, copy the **Account ID** from the right sidebar.

### 4. Add the secrets to GitHub

In your GitHub repository:
- Settings → Secrets and variables → Actions → **New repository secret**
- Add two secrets:
  - `CLOUDFLARE_API_TOKEN` — the API token from step 2
  - `CLOUDFLARE_ACCOUNT_ID` — the Account ID from step 3

### 5. Push to `main`

```bash
git push origin main
```

The GitHub Action will:
1. Install dependencies (`npm ci`)
2. Build the Astro site (`npm run build`)
3. Upload `./dist/` to Cloudflare Pages project `paxonhuang`

The site will be live at <https://paxonhuang.pages.dev>.

## Manual Deploy (with Wrangler)

If you want to deploy from your local machine (useful for quick fixes), authenticate first:

```bash
npx wrangler login            # OAuth login (opens browser)
# OR set CLOUDFLARE_API_TOKEN in env
```

Then build and deploy:

```bash
npm ci
npm run build
npx wrangler pages deploy ./dist --project-name=paxonhuang --branch=main
```

## Custom Domain

To attach a custom domain (e.g. `paxonhuang.com`):

1. Cloudflare Dashboard → Workers & Pages → `paxonhuang` → Custom domains
2. Add the domain — DNS is auto-configured if the zone is already on Cloudflare.
3. Optionally add a `wrangler.jsonc` `routes` section if using DNS-only mode.

## Preview Deployments

Every PR opened against `main` gets a unique preview URL automatically (e.g. `https://a7c8921a.<commit-sha>.paxonhuang.pages.dev`).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Action fails with `Authentication error [code: 10000]` | Check `CLOUDFLARE_API_TOKEN` secret is valid and not expired |
| Build fails: `Cannot find module @astrojs/react` | Run `npm ci` (not `npm install`) to use the locked dependency tree |
| 404 on routes | Cloudflare Pages auto-handles SPA routing for static assets; no `_redirects` needed for this Astro build |
| `nodejs_compat` flag warning | Already enabled in `wrangler.jsonc` for Astro v5 SSR compatibility |
