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

### "The process 'npx' failed with exit code 1"

This is the generic "something failed in npx" error. **Click into the failed run on the Actions tab to see the actual step that failed.** Most common causes:

| # | Cause | How to verify | Fix |
|---|-------|---------------|-----|
| 1 | `CLOUDFLARE_API_TOKEN` not set or wrong | Open repo → Settings → Secrets → check both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exist | Regenerate the token with **Edit Cloudflare Pages** template, update the secret |
| 2 | Token missing Pages:Edit permission | Go to <https://dash.cloudflare.com/profile/api-tokens> → click the token → **Permissions** | Edit the token, add `Account → Cloudflare Pages: Edit`, copy new value to secret |
| 3 | Project `paxonhuang` not auto-created (rare) | Check the `Deploy to Cloudflare Pages` step log for "Project not found" | Manually create it: Dashboard → Workers & Pages → Create → Pages → Connect to Git → name it `paxonhuang` |
| 4 | `Account ID` wrong | Compare `CLOUDFLARE_ACCOUNT_ID` to the one in Dashboard → Workers & Pages → right sidebar | Update the secret with the correct 32-char hex string |
| 5 | `npm ci` failure | Check the "Install dependencies" step log | Run `npm install` locally to regenerate `package-lock.json`, commit the new lockfile |

### "Node.js 20 is deprecated" warning

GitHub deprecated Node 20 in late 2025 ([changelog](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/)). The workflow now uses **Node 22 LTS** — clear the warning by pulling the latest workflow file:

```bash
git pull origin main
```

### Other common issues

| Issue | Fix |
|-------|-----|
| Action fails with `Authentication error [code: 10000]` | `CLOUDFLARE_API_TOKEN` is invalid or expired — regenerate it |
| Build fails: `Cannot find module @astrojs/react` | `package-lock.json` is out of sync — run `npm install` locally and commit the updated lockfile |
| 404 on routes | Cloudflare Pages auto-handles SPA routing; no `_redirects` needed for this Astro build |
| KaTeX math not rendering | `rehype-katex` runs at build time — verify `astro.config.mjs` has the plugin listed |
| `nodejs_compat` flag warning | Already enabled in `wrangler.jsonc` for Astro v5 SSR compatibility |

### How to re-run a failed workflow

1. Go to <https://github.com/PaxonHuang/PaxonHuang/actions>
2. Click the failed run (red ✗)
3. Click **Re-run jobs** → **Re-run failed jobs**

Or, if you only need to retrigger, push an empty commit:

```bash
git commit --allow-empty -m "chore: retry deployment"
git push
```
