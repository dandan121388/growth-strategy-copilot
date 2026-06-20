# Vercel Deployment Checklist

Use this checklist for every preview or production deployment. The current MVP uses mock analysis and does not require an API key.

## Pre-deployment checklist

- [ ] Run `npm install`.
- [ ] Run `npm run type-check`.
- [ ] Run `npm run build`.
- [ ] Run `npm run start`.
- [ ] Open the local production build using the URL printed in the terminal.
- [ ] Test **Start Demo with Fitness Sample**.
- [ ] Test **Reset Demo**.
- [ ] Test the **English / 中文** switch and refresh once in each language.
- [ ] Test Report copy and Markdown export.
- [ ] Test a mobile-width viewport, including opening and closing navigation.
- [ ] Confirm that source files and documentation contain no personal local paths.
- [ ] Confirm that the current mock demo requires no API key.
- [ ] Confirm that `.env.local` is not committed.
- [ ] Confirm that `.vercel` is ignored by Git.

## Route refresh checklist

Open and refresh each route in the production build:

- [ ] `/`
- [ ] `/dashboard`
- [ ] `/business-setup`
- [ ] `/data-upload`
- [ ] `/diagnosis`
- [ ] `/segmentation`
- [ ] `/strategy`
- [ ] `/experiments`
- [ ] `/report`

With no saved workspace, analysis routes should show a safe empty state. After starting and diagnosing the sample demo, they should restore the workspace from browser localStorage.

## Responsive checklist

- [ ] 1440px desktop: cards, charts and sidebar remain balanced.
- [ ] 1280px laptop: no page-level horizontal overflow.
- [ ] 768px tablet: mobile navigation opens, closes and does not cover content after navigation.
- [ ] 390px phone: tables scroll within their cards; Strategy, Experiments and Report remain readable.
- [ ] Chinese mode: headings, buttons, cards and report content do not create page-level overflow.
- [ ] Priority Matrix and lifecycle charts remain understandable at narrow widths.

## Post-deployment checklist

- [ ] Open the production URL.
- [ ] Test Dashboard.
- [ ] Test **Start Demo with Fitness Sample**.
- [ ] Run and inspect Diagnosis.
- [ ] Inspect dynamic Strategy scores and P0 recommendations.
- [ ] Inspect Experiments.
- [ ] Inspect all three Report views.
- [ ] Test Chinese mode and refresh the page.
- [ ] Test on a mobile device or mobile browser viewport.
- [ ] Refresh every application route.
- [ ] Confirm the browser console has no application errors.
- [ ] Test Markdown export.
- [ ] Share the production URL with another device and verify that it opens with fresh local state.

## Security confirmation

- [ ] No credential value is present in code, documentation, screenshots or deployment configuration.
- [ ] No environment variable is embedded in `vercel.json` or client-side code.
- [ ] No personal local path or username appears in committed files.
- [ ] `.env`, `.env.local`, `.env.*.local` and `.vercel` remain ignored.
