---
layout: wiki
title: GIT
comments: false
---

#Basic commands

 * ```git init``` - Init local repo
 * ```git add -all``` - Add all changed, new and removed files
 * ```git commit -m "Commit message"``` - performs commit of added files to the local repository
 * ```git remote add origin https://github.com/kospiotr/sample-repo.git``` - add remote repository link to local repository
 * ```git push origin master``` - transfers changes from local to remote repositories
 
# Excluding files from repository
  Reference: [http://git-scm.com/docs/gitignore](http://git-scm.com/docs/gitignore)
To exclude certains directories and files you need to place them in ```.gitignore``` file. Here you can find some examples for popular project structures: [https://github.com/github/gitignore](https://github.com/github/gitignore)

The purpose of gitignore files is to ensure that certain files not tracked by Git remain untracked.
To ignore uncommitted changes in a file that is already tracked, use ```git update-index --assume-unchanged```.
To stop tracking a file that is currently tracked, use ```git rm --cached```.
