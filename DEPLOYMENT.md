# Cloudflare Pages deployment

GitHub repository: https://github.com/rakezhou2020/mythcoloring

The existing Next.js application exports static HTML to `out`. No server runtime
or adapter is required by the current homepage. Adding server-only features in
the future will require revisiting this deployment configuration.

## Git integration

Create a Cloudflare Pages project using **Import an existing Git repository**
and connect `rakezhou2020/mythcoloring` (do not use Direct Upload).

- Production branch: `main`
- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: repository root
- Node.js: 22 (also specified in `.node-version`)
- Keep automatic production deployments enabled for `main`.

Cloudflare installs dependencies using the committed npm lockfile and builds
each pushed update. Make application and deployment changes in GitHub.

## Domains

Add both `mythcoloring.com` and `www.mythcoloring.com` in the Pages project's
Custom domains tab and complete Cloudflare's DNS and certificate activation.
The apex domain requires an active Cloudflare zone. Preserve unrelated DNS records.

The homepage canonical URL is `https://mythcoloring.com`. The version-controlled
`public/_redirects` file permanently redirects the www hostname to the apex and
preserves the path. Both hostnames must be associated with the Pages project
for this rule to run. Enable Always Use HTTPS in the zone's SSL/TLS settings.

## Verification

Run `npm ci` and `npm run build` before pushing. Confirm the deployment reports
success for the latest `main` commit, then verify:

- `https://mythcoloring.com/` returns HTTP 200 with the existing homepage.
- Its canonical link points to `https://mythcoloring.com`.
- `https://www.mythcoloring.com/` redirects to the apex.
- A www URL with a path and query retains both after redirecting.
- Styles and JavaScript load, and unknown paths return HTTP 404.

`npm run dev` remains the local development command. The exported `out` folder
can be served by a static HTTP server; `next start` does not serve static exports.

## Content framework

- Edit `data/coloring-pages.ts`, `data/themes.ts`, and `data/creatures.ts` to add content.
- Only `status: "published"` entries are rendered. Dynamic theme and creature routes
  use `generateStaticParams`, so drafts have no exported page or sitemap entry.
- All current artwork is explicitly labeled as a placeholder. Replace null image
  fields with local public asset paths when artwork is ready. Set `printImage` for
  printing and `pdfUrl` for downloading; unavailable resources remain disabled.
- Product fields support later theme, type, difficulty, and creature filtering.
- Run `npm run build` and `node scripts/verify-export.mjs` before pushing.
- Trailing-slash routes export to directory index files for Cloudflare Pages.
