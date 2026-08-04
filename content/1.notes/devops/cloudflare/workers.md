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