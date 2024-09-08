---
layout: post
title:  "Private VPS with Raspberry PI 3"
date:   2018-06-18 18:00:00
---

# Prerequisite

- Raspberry PI 3
- Public IP (optionally)

# Install and configure RPI

* Download Raspian Litle from: [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/) and unzip it
* Copy image to the card: [https://www.raspberrypi.org/documentation/installation/installing-images/linux.md](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)
  * `dd bs=4M if=2017-04-10-raspbian-jessie-lite.img of=/dev/mmcblk0`
  * `sync`
* Enable SSH on a headless RPI
  * `sudo mkdir /media/sd && sudo mount /dev/mmcblk0p1 /media/sd` - mount bootable partition of the SD card
  * `sudo touch /media/sd/ssh` - create `ssh` file on the SD card which enables SSH on boot  
* Insert SD card in the RPI, turn it on and connect to the LAN
* `ssh pi@192.168.1.10` - connect via ssh where `192.168.1.10` is local address of the RPI

# Install software

* Install commons
  * sudo apt-get update
  * sudo apt-get install software-properties-common vim
* Install java
```sudo wget -O /tmp/jdk.tar.gz --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-arm64-vfp-hflt.tar.gz
sudo mkdir /opt/jdk/ && \
sudo tar xvzf /tmp/jdk.tar.gz -C /opt/jdk/
```
* Install Jenkins
  * Instructions: [http://kospiotr.github.io/wiki/jenkins/](http://kospiotr.github.io/wiki/jenkins/)
* Install GIT
```
sudo apt-get install git
```
* Configure ssh keys for jenkins user
* Install Docker
```
curl -sSL https://get.docker.com | sh
```
* Grant permissions for Docker to Jenkins
```
sudo usermod -aG docker jenkins
```
