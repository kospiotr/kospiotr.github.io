---
layout: wiki
title: Raspberry Pi
comments: false
toc: true
editurl: wiki/raspberry-pi.md
---

# Start

* Download OS from: https://www.raspberrypi.org/downloads/raspbian/
* Install it to the SD card: https://www.raspberrypi.org/documentation/installation/installing-images/linux.md
* Enable ssh for headless access: https://www.raspberrypi.org/documentation/remote-access/ssh/

# Commands

* `sudo dd bs=1M if=2017-01-11-raspbian-jessie-lite.img of=/dev/mmcblk0` - install image to sd card

# Install web transmission

* Instal with `sudo apt-get install transmission-daemon`.
* Stop service in order to not override settings change by: `sudo service transmission-daemon stop`
* Edit settings file: `sudo nano /etc/transmission-daemon/settings.json`, and modify:
    * "rpc-whitelist": "127.0.0.1,192.168.*.*"
    * "rpc-username": "{{your_username}}"
    * "rpc-password": "{{your_password}}"
* Run service by: `sudo service transmission-daemon start`
    
Reference: {https://help.ubuntu.com/community/TransmissionHowTo}[https://help.ubuntu.com/community/TransmissionHowTo]
