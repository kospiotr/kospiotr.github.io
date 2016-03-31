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
* `diff -bur dir1 dir2` - differs content of two directories
* `find . -type f -exec md5sum {} \; | sort -k 34 | md5sum` - computes md5 for the current directory
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
or via package:

```bash
sudo wget -O /tmp/jdk.tar.gz --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u73-b02/jdk-8u73-linux-x64.tar.gz && \
sudo mkdir /opt/jdk/ && \
sudo tar xvzf /tmp/jdk.tar.gz -C /opt/jdk/

sudo update-alternatives --install /usr/bin/java java /opt/jdk/jdk1.8.0_73/bin/java 100 &&
sudo update-alternatives --install /usr/bin/javac javac /opt/jdk/jdk1.8.0_73/bin/javac 100

sudo update-alternatives --config java
sudo update-alternatives --config javac

java -version
javac -version
```

## Maven

```
wget http://apache.mirror.anlx.net/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz && \
tar -zxf apache-maven-3.3.9-bin.tar.gz && \
sudo cp -R apache-maven-3.3.9 /usr/local && \
sudo ln -s /usr/local/apache-maven-3.3.9/bin/mvn /usr/bin/mvn && \
sudo ln -s /usr/local/apache-maven-3.3.9/bin/mvnDebug /usr/bin/mvnDebug
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
* sudo update-manager
* ppa-purge:
```
sudo apt-get install ppa-purge
sudo apt-get update
sudo ppa-purge ppa:xorg-edger/ppa
```
