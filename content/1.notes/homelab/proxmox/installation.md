---
title: Installation
---
- Tutorial: https://www.youtube.com/watch?v=lFzWDJcRsqo
- Script: https://community-scripts.org/scripts/post-pve-install

  Options:
  - ✓ Disabled 'pve-enterprise' repository
  - ✓ Disabled 'ceph enterprise' repository
  - ✓ Kept 'pve-no-subscription' repository
  - ✓ 'ceph' package repository (no-subscription) already exists (skipped)
  - ✗ Selected no to Adding 'pvetest' repository
  - ✓ Disabled subscription nag (Delete browser cache)

Remove image / CT with given ID:
```bash
ID=401; if pct status "$ID" >/dev/null 2>&1; then pct stop "$ID" 2>/dev/null || true; pct destroy "$ID" --purge; elif qm status "$ID" >/dev/null 2>&1; then qm stop "$ID" 2>/dev/null || true; qm destroy "$ID" --purge; else echo "No VM or CT with ID $ID found"; exit 1; fi
```

Or in bulk:
```bash
for ID in 401 402 403; do if pct status "$ID" >/dev/null 2>&1; then pct stop "$ID" 2>/dev/null || true; pct destroy "$ID" --purge; elif qm status "$ID" >/dev/null 2>&1; then qm stop "$ID" 2>/dev/null || true; qm destroy "$ID" --purge; else echo "No VM or CT with ID $ID found"; fi; done
```