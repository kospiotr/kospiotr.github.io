---
layout: wiki
title: Jekyll
comments: false
toc: true
editurl: wiki/jekyll.md
---

# Install

# Docker CLI

```
export JEKYLL_VERSION=3.5
export PROJECT_NAME="NewJekyllProject"
mkdir -p ~/Projects/$PROJECT_NAME ; cd ~/Projects/$PROJECT_NAME
docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll:$JEKYLL_VERSION jekyll new .
