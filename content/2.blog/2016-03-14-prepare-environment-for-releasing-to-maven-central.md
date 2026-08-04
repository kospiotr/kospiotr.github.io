---
layout: post
title:  "Prepare environment for releasing to Maven Sentral Repository"
date:   2016-03-14 18:00:00
draft: true
---

# Prepare environment

Generate key for signing build package:
import existing key ```gpg2 --keyserver x-hkp://pool.sks-keyservers.net --recv-keys 9EBCB0B3```
or generate new ```gpg --gen-key```
and export it ```gpg2 --keyserver hkp://pool.sks-keyservers.net --send-keys A6BAB25C```

install if needed ```sudo aptitude install haveged```

