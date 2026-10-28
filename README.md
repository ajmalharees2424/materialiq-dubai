# MaterialIQ — Dubai fit-out material sourcing

A Next.js application for searching source-linked UAE material prices, comparing up to four variants, bookmarking materials, and exporting project estimates.

## Run

Requires Node.js 22+ and npm.

```sh
npm ci
npm test
npm run build
npm start
```

Use `npm run dev` for development. No API key is required for the configured public catalogs.

## Data and refresh

- Four configured suppliers: A1 Build, e-Delivery, NQ Cart, Canvas General Trading.
- `lib/sources.json` defines an allowlisted, bounded collection scope. No user-provided URL is fetched.
- `lib/seed.json` contains real collected snapshots, each with its collection time and source link.
- `GET /api/prices?source=a1` (or `ed`, `nq`, `canvas`) refreshes a supplier. Successful responses are cached using the Next.js Data Cache for one hour.
- Collection happens on demand, not continuously or across the whole internet.
- Each source is isolated. A failed supplier returns its dated snapshot. A partly successful supplier is labeled partial coverage.
- Requests have timeouts and a five-megabyte limit. Redirects, zero-price entries and foreign-origin product URLs are rejected. The system does not bypass logins or anti-bot challenges.
- `npm run collect` explicitly refreshes bundled snapshots locally using curl. Review `lib/collection-report.json`, rerun tests/build, then commit updated snapshots.
- Supplier formats and access policies can change. Review supplier permissions before expanding crawling. This is not an approved commercial feed partnership.

## Estimate semantics

Quantities apply to the supplier's listed unit/variant. VAT is unknown unless explicitly provided. Wastage is a budget percentage applied to listed material costs, not a promise of pack rounding. Delivery is a user-entered allowance. Installation is excluded. CSVs include source URLs and collection dates. Project line items retain the price captured when added, even after a catalog refresh.

Bookmarks and estimate lines are local to the browser. Project name and allowances are session-only. There are no user accounts, shared projects, payment integrations, email alerts, price-history database, or unattended crawl scheduler in this release.

## Deploy to GitHub and Vercel

1. Create a private GitHub repository `materialiq-dubai` under the intended account.
2. Commit the contents of this directory, excluding ignored paths. Never commit credentials.
3. Import the repository into the authorized Vercel team as a Next.js project. The `vercel.json` and npm lockfile provide build settings.
4. Deploy the main branch. Verify `/` and each `/api/prices?source=...` response on the production deployment.
5. Verify search, comparisons, supplier links and CSV export against the production site. Supplier access from Vercel is not proven by a local collection.

Source repository: https://github.com/ajmalharees2424/materialiq-dubai. Vercel project: materialiq-dubai (prj_ZTwXFyCCugST0y0kR4NMS8kRl9Sf). Source was deployed directly because Vercel's GitHub integration could not access this private repository. Enable repository access and connect it under Vercel Settings → Git for automatic deployments. Production retains Vercel Authentication until public access is approved. Verify live supplier access after each deployment.

## Validation

Parser tests cover variant prices, quote-only exclusions, configured-origin enforcement, supplier errors and scoped HTML price extraction. TypeScript and an optimized Next.js production build are required before release.
