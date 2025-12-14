---
title: GIT integration
---

# Prerequisittes
- SSH Terminal

# Set-up
```
ssh-keygen -t ed25519 -C "kospiotr@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat /root/.ssh/id_ed25519.pub
```
Add the key to the Github account

# Init repo
```
cd /homeassistant
git init
git status
git add .
git commit -m "Init"
git remote add origin git@github.com:kospiotr/home-assistant-config.git
git push origin master
```

# Working with git
```
git add . && git comit -m "Update" && git push origin adding_shades
```
