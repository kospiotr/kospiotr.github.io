---
title: Jekyll
---

# Install

# Docker CLI

```
export JEKYLL_VERSION=3.5
export PROJECT_NAME="NewJekyllProject"
mkdir -p ~/Projects/$PROJECT_NAME ; cd ~/Projects/$PROJECT_NAME
```

## New project
```
docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll:$JEKYLL_VERSION jekyll new .
```

## Build project
```
docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll:$JEKYLL_VERSION jekyll build
```

## Serve project
```
docker run --name newblog --volume="$PWD:/srv/jekyll" -p 3000:4000 -it jekyll/jekyll:$JEKYLL_VERSION jekyll serve --watch --drafts
```

## Execute command in container - install theme
```
docker exec -ti myblog gem install "jekyll-theme-hydeout"
```

## Bash in container
```
docker exec -ti myblog /bin/sh
```

## Remove container
```
docker rm -f myblog
```
