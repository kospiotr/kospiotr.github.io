---
layout: wiki
title: GIT
comments: false
toc: true
editurl: wiki/git.md
---

#Basic commands

 * ```git init``` - Init local repo
 * ```git status``` - displays status of the repository
 * ```git diff --staged``` - diff to staged (commited) files to local repo
 * ```git add -all``` - Add all changed, new and removed files
 * ```git commit -m "Commit message"``` - performs commit of added files to the local repository
 * ```git remote add origin https://github.com/kospiotr/sample-repo.git``` - add remote repository link to local repository
 * ```git push origin master``` - transfers changes from local to remote repositories
 * ```git push -u origin master``` - remember settings that next time you can use only ```git push```
 * ```git push origin --all``` - push everything to remote repository including branches
 * ```git add --all & git commit -m "Update" & git push``` - add all, commit and push together
 * ```git checkout``` discard changes in working directory
 * ```git reset --hard``` - all changes will be reverted
 * ```git clean -df``` - clean all untracked directories and files
 * ```git branch | grep -v "master" | xargs git branch -D ``` - removes all branchces except master and current

# Excluding files from repository
  Reference: [http://git-scm.com/docs/gitignore](http://git-scm.com/docs/gitignore)
To exclude certains directories and files you need to place them in ```.gitignore``` file. Here you can find some examples for popular project structures: [https://github.com/github/gitignore](https://github.com/github/gitignore)

The purpose of gitignore files is to ensure that certain files not tracked by Git remain untracked.
To ignore uncommitted changes in a file that is already tracked, use ```git update-index --assume-unchanged```.
To stop tracking a file that is currently tracked, use ```git rm --cached```.

# Push to all git remotes with the one command
Create an all remote with several repo URLs to its name:

```
git remote add all [url1]
git remote set-url --add all [url2]
git remote set-url --add all [url3]
```

Then just `git push all --all`.

This is how it looks in .git/config:

```
  [remote "all"]
  url = [url1]
  url = [url2]
  url = [url3]
```

Source: [http://stackoverflow.com/a/5785618/276948](http://stackoverflow.com/a/5785618/276948)


# Branching

 * ```git branch -a``` - display branches
 * ```git branch --merged``` - display only merged branches
 * ```git branch --no-merged``` - display only no merged branches
 * ```git branch -df <branchName>``` - force to delete branch locally
 * ```git push origin --delete <branchName>``` - deletes branch remotelly
 * ```git pull -a --prune``` - prunes all local branches

#Certificates
##Generate private / public keys

```
Generating public/private rsa key pair.
Enter file in which to save the key (//.ssh/id_rsa): C:\Users\Piotr\.ssh\id_rsa
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\Piotr\.ssh\id_rsa.
Your public key has been saved in C:\Users\Piotr\.ssh\id_rsa.pub.
The key fingerprint is:
84:ea:b5:95:bd:a6:e9:73:83:9d:34:af:f7:15:04:a7 kospiotr@tlen.pl
```

To use ssh with remote repositories you need to publish your public key to this services. It can be localized here:

```bash
C:\>clip <  C:\Users\Piotr\.ssh\id_rsa.pub
```
#Git tools

##Smartgit
[SmartGit] is a graphical Git and Mercurial client. It runs on Linux, Mac OS X (10.5 or newer) and Windows (XP or newer).

```
sudo add-apt-repository ppa:eugenesan/ppa
sudo apt-get update
sudo apt-get install smartgithg
```

#Github tools
* Travis - CI
* waffle.io - Stories board
* shields.io - icons
* coveralls.io - Test Coverage History & Statistics

#External resources
* [Cheat cheet](../resources/git-cheat-sheet.svg)
* [Git Recipes - Wlodzimierz Gajda](../resources/books/Git Recipes - Wlodzimierz Gajda.pdf)
* [http://try.github.io](http://try.github.io)
* [https://help.github.com/articles/generating-ssh-keys](https://help.github.com/articles/generating-ssh-keys)
* Pro GIT book [pdf](https://github.s3.amazonaws.com/media/progit.en.pdf) [epub](https://github.s3.amazonaws.com/media/progit.epub)


