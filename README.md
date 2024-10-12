# pkosmowski.pl

# Development

## Native

```bash
hugo server
```

## Docker-Compose
```bash
docker-compose up
```

## Docker
```bash
docker run -p 1313:1313 \
  -v ${PWD}:/src \
  hugomods/hugo:exts-0.128.2 \
  hugo server --bind 0.0.0.0
```

Push changes:
```bash
git add . && git commit -m "Update" && git push
```
