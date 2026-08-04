---
title: Cloudflare Workers
---

# Troubleshooting

## Build fails with "JavaScript heap out of memory" (Nuxt/Nitro + Workers Builds)

Symptom: build succeeds through client/server build and prerendering, then crashes during the final
`[nitro] Building Nuxt Nitro server (preset: cloudflare-module...)` step with:

```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

Cause: that step bundles the *entire* Worker script (client output, prerendered routes, `@nuxt/content`
sqlite dumps, wasm, etc.) in one Rollup/esbuild pass. Workers Builds containers have 8 GB of memory available,
but Node's default heap sizing doesn't claim anywhere near that, so it OOMs well below the container limit
(heap logs show it capping out around ~2 GB).

Fix: bump Node's heap size for the build. In the Cloudflare dashboard:

* Worker → **Settings → Build → Build variables and secrets**
* Add `NODE_OPTIONS` = `--max-old-space-size=6144` (leave headroom under the 8 GB container limit; push
  toward `7168` if it still OOMs)

Note: build-time variables set here are **not** exposed at runtime — separate from
**Settings → Variables & Secrets**.

If it still OOMs after that, look at what's being inlined into the bundle (prerendered route count, OG image
generation, content collection size) rather than just raising the limit further.

## Direct URL 404s, but the same page loads fine via in-app navigation

Symptom: hitting a page URL directly (fresh tab / hard refresh) returns 404, but clicking to the same URL
via the app's menu (client-side nav) loads it correctly.

How to tell it's this and not a missing/un-prerendered static asset: `curl -D - <url>` the failing page. If
the response is JSON like `{"error":true,"statusCode":404,"statusMessage":"Page not found"}`, that's Nitro's
own `createError` — the request *reached* the Worker and ran SSR, it just found no content. (A genuine
missing-static-asset 404 from Cloudflare's asset router looks different — no JSON body like that.)

Cause (`@nuxt/content` v3 on `cloudflare_module`): content is served two different ways —

* **Client-side navigation** reads a WASM SQLite copy shipped as a static asset (built from the content
  dump at build time) — always in sync with the latest deploy, never touches D1.
* **Server-side rendering** (direct hits, crawlers, pages not statically prerendered) reads from a bound
  **D1 database** (`env.DB`). If `nitro.cloudflare.wrangler.d1_databases` isn't set in `nuxt.config.ts`,
  the binding never gets wired into the deployed Worker, so content queries return nothing server-side —
  hence 404 only on direct/SSR requests.

Check: `npx wrangler d1 list` — if a database was auto-provisioned for the project but shows `num_tables: 0`,
its migration never ran, confirming the binding was missing (content module migrates it on boot once bound).

Fix — explicitly declare the binding in `nuxt.config.ts`:

```ts
nitro: {
  preset: 'cloudflare_module',
  cloudflare: {
    deployConfig: true,
    wrangler: {
      d1_databases: [
        {
          binding: 'DB',
          database_name: '<database-name-from-wrangler-d1-list>',
          database_id: '<uuid-from-wrangler-d1-list>'
        }
      ]
    }
  }
}
```

Redeploy after this — the module migrates content into D1 on Worker boot once the binding exists.