---
layout: wiki
title: Unix
comments: false
toc: true
editurl: wiki/unix.md
---

# Commands

* `du -sh *` - list all directories and files with its real size
* `du -h * | sort -r | head -50` - 50 heaviest subdirectories with size
* `tar -cvf archived-file.tar ./directory-to-archive` - tar directory to file
* `tar - xvf archived-file.tar` - untar directory to file
* `tar -czvf archived-file.tar.gz ./directory-to-archive` - tar.gz directory to file
* `tar - xzvf archived-file.tar.gz` - untar.gz directory to file
* `scp file.zip username@host:/home/target/path/` - copy file to remote host with scp
* `ps aux | grep java` - display all services with java string
* `kill $(ps aux | grep 'chrome' | awk '{print $2}')` - kill all processess with chrome phrase
* `python -m SimpleHTTPServer 8000` - very light HTTP server with Python
* `netstat -tulpn | grep 8080` - return process which process listen on port 8080
* ` ln -s target_path link_path` - create symbolic link
* `find /media/kospiotr/8765-4321/DCIM/105GOPRO -type f -mtime -20 -exec cp -p "{}" /tmp/photos \;` - copy files newer than 20 days from my GoPro to ```/tmp/photos``` directory with preserved modification timestamp
* `find /run/user/1000/gvfs/mtp:host=%5Busb%3A003%2C003%5D/Pamięć wewnętrzna/DCIM/Camera -type f -mtime -20 -exec cp -p "{}" /home/kospiotr/Obrazy/CG \;` - copy files as above from OnePlus camera 


# Set up environment

## Chrome

```bash
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && \
sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
sudo apt-get update && \
sudo apt-get install google-chrome-beta
```

## JDK 8

```bash
sudo add-apt-repository ppa:webupd8team/java && \
sudo apt-get update && \
sudo apt-get install oracle-java8-installer
```

## GIT

```bash
sudo add-apt-repository ppa:git-core/ppa && \
sudo apt-get update && \
sudo apt-get install git
```

## NodeJS

```bash
sudo add-apt-repository ppa:rwky/nodejs && \
sudo apt-get update && \
sudo apt-get install nodejs && \
sudo npm install -g grunt-cli
```

## VLC

```bash
sudo apt-get install vlc browser-plugin-vlc
```
# Elementary OS

* http://www.elementarynow.com/
* https://plus.google.com/communities/104613975513761463450
* https://oduso.com/

## Tweaks

```bash
sudo add-apt-repository ppa:mpstark/elementary-tweaks-daily
sudo apt-get update
sudo apt-get install elementary-tweaks
```



# Recipes

## Remove obsolate PPA

* edit ```/etc/apt/sources.list```
* install synaptic
