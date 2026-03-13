# 360° View Deep Scan – Findings

## What was tested

1. **In-app resolution** – For every car in `lib/cars`, does `getSpin360Url(car)` return a URL?
2. **Impel URL reachability** – For each unique Impel URL, does HTTP GET return 2xx?

## Result (run: `node scripts/check-360-urls.mjs`)

- **Resolution:** 15/15 cars get a 360° URL. No missing mappings.
- **Reachability:** 15/15 Impel URLs return HTTP 200.

So **this is not a “fetching” or “missing URL” issue** in the app. Every car has a URL and every URL is reachable.

## Why 360° can still be “missing” for most cars

If the **button/tab shows** but the **viewer is blank or errors** for most cars, the cause is almost certainly **inside the iframe** (Impel side or browser policy), not our resolution or network:

1. **Permissions-Policy** – We added `accelerometer` and `gyroscope` for `https://spins.impel.io` in `next.config.mjs`. If the deployment doesn’t send these headers, the Impel page can throw “accelerometer is not allowed” and then scripts may fail (e.g. `postMessage` on null).
2. **Impel per-spin config** – Some spins may be unpublished, not embeddable, or have different CORS/embed settings even though the URL returns 200.
3. **Impel JS errors** – e.g. `Cannot read properties of null (reading 'postMessage')` in their script when the embed context isn’t what they expect.

## What to do next

1. **Confirm resolution in your environment**  
   Call `GET /api/debug-360` on your deployed site. If any car has `has360: false`, then in that environment the car list or IDs differ from `lib/cars` (e.g. API) and we need to fix resolution for that source.

2. **Confirm headers in production**  
   Check response headers for your site and ensure `Permissions-Policy` includes  
   `accelerometer=(self "https://spins.impel.io"), gyroscope=(self "https://spins.impel.io")`.

3. **Impel dashboard**  
   For each spin that doesn’t show the viewer, in Impel check: published, embed allowed, and no errors in their embed code.

4. **Re-run the script after changes**  
   `node scripts/check-360-urls.mjs` – confirms resolution and URL reachability from the app’s perspective.
