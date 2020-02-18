---
layout: wiki
title: Unix
comments: false
toc: true
editurl: wiki/unix.md
---

# Commands

* `apt-cache policy <packageName>` - check available version
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
* `find . -type f -print0 | xargs -0 md5sum` - computes md5 for each file in the directory
* ` ln -s target_path link_path` - create symbolic link
* `find /media/kospiotr/8765-4321/DCIM/105GOPRO -type f -mtime -20 -exec cp -p "{}" /tmp/photos \;` - copy files newer than 20 days from my GoPro to ```/tmp/photos``` directory with preserved modification timestamp
* `find /run/user/1000/gvfs/mtp:host=%5Busb%3A003%2C003%5D/Pamięć wewnętrzna/DCIM/Camera -type f -mtime -20 -exec cp -p "{}" /home/kospiotr/Obrazy/CG \;` - copy files as above from OnePlus camera 
* `sudo apt-get install gnome-system-monitor` - taask manager from GNOME
* `sudo mkfs -t vfat /dev/mmcblk0` - format /dev/mmcblk0 device as fat
* `umount /dev/sdb1 && badblocks -svn /dev/sdb1` - check ssd card
* `umount /dev/sdb1 && badblocks -o ./badblocks.list -w -s -v -b 4096 -c 16 /dev/mmcblk0` - check ssd card in destructive way
* `sudo adduser <username> sudo` - create user and add it to `sudo` group
* `sudo usermod -a -G sudo <username>` - add user to group `sudo`
* `ssh cloud_user@talentmanagement3c.mylabserver.com -R 7001:localhost:7000` - espose local 7000 port on remote machine on 7001 port locally
* `ssh cloud_user@talentmanagement3c.mylabserver.com -R 7001:localhost:7000` - espose local 7000 port on remote machine on 7001 port locally

# Set up environment

## Commons

```bash
sudo apt-get install software-properties-common gdebi
```

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
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Remove:

```bash
 sudo rm -rf bin/node bin/node-waf include/node lib/node lib/pkgconfig/nodejs.pc share/man/man1/node
 ```

## VLC

```bash
sudo apt-get install vlc browser-plugin-vlc
```

## Intellij Idea

* Download version without jdk

```bash
sudo cp ~/Pobrane/idea-* /opt -r \
sudo chown 
```

Create activator:

```bash
vim ~/.local/share/applications/jetbrains-idea.desktop

paste:
[Desktop Entry]
Version=1.0
Type=Application
Name=IntelliJ IDEA
Icon=/opt/idea-IU-143.1184.17/bin/idea.png
Exec="/opt/idea-IU-143.1184.17/bin/idea.sh" %f
Comment=Develop with pleasure!
Categories=Development;IDE;
Terminal=false
StartupWMClass=jetbrains-idea
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
## Create custom Activator:

Create a ```.desktop``` file in your ```~/.local/share/applications``` folder for the script (or in ```usr/share/applications``` for system wide access). E.g.:

```
[Desktop Entry]
Name=My bash script
Comment=bash script to do custom stuff
Type=Application
Exec=/path/to/bash/script %U
Icon=/path/to/some/fancy/icon
Terminal=false (or true)
Categories=Other;
```

It will show up in the Other category for slingshot. Run it and then select "Keep in dock" when it is running.

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

# Add cloud printer

```
sudo add-apt-repository ppa:simon-cadman/niftyrepo
sudo apt-get update
sudo apt-get install cupscloudprint
```
Once the installation is ready, you can connect your server to the Google Cloud Print account.
