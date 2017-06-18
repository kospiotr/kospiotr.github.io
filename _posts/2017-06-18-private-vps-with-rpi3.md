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
  * `sudo mkdir /media/sd && sudo mount /dev/mmcblk0p2 /media/sd` - mount SD card
  * `sudo touch /media/sd/ssh` - create `ssh` file on the SD card which enables SSH on boot  
