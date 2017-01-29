---
layout: wiki
title: Raspberry Pi
comments: false
toc: true
editurl: wiki/raspberry-pi.md
---

# Start

* Download OS from: [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
* Install it to the SD card: [https://www.raspberrypi.org/documentation/installation/installing-images/linux.md](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)
* Enable ssh for headless access: [https://www.raspberrypi.org/documentation/remote-access/ssh/](https://www.raspberrypi.org/documentation/remote-access/ssh/)

# Commands

* `sudo dd bs=1M if=2017-01-11-raspbian-jessie-lite.img of=/dev/mmcblk0` - install image to sd card

# Install web Transmission

* Instal with `sudo apt-get install transmission-daemon`.
* Stop service in order to not override settings change by: `sudo service transmission-daemon stop`
* Edit settings file: `sudo nano /etc/transmission-daemon/settings.json`, and modify:
    * "rpc-whitelist": "127.0.0.1,192.168.*.*"
    * "rpc-username": "{{your_username}}"
    * "rpc-password": "{{your_password}}"
* Run service by: `sudo service transmission-daemon start`
    
Reference: [https://help.ubuntu.com/community/TransmissionHowTo](https://help.ubuntu.com/community/TransmissionHowTo)

# Install Owncloud

```
wget -nv https://download.owncloud.org/download/repositories/stable/Debian_8.0/Release.key -O Release.key
apt-key add - < Release.key
sh -c "echo 'deb http://download.owncloud.org/download/repositories/stable/Debian_8.0/ /' > /etc/apt/sources.list.d/owncloud.list"
apt-get update
apt-get install owncloud
```

Configure apache to redirect root context to /owncloud automatically:

Edit `/etc/apache2/sites-enabled/000-default.conf` and change the settings of DocumentRoot so that it reads:

```
DocumentRoot /var/www/owncloud
```

Restart Apache: `service apache2 restart`



References: 

* [https://download.owncloud.org/download/repositories/stable/owncloud/](https://download.owncloud.org/download/repositories/stable/owncloud/)
* [http://projpi.com/diy-home-projects-with-a-raspberry-pi/pi-owncloud-drop-box-clone/](http://projpi.com/diy-home-projects-with-a-raspberry-pi/pi-owncloud-drop-box-clone/)

# Resources

* (https://raymii.org/s/blog/Broken_Corrupted_Raspberry_Pi_SD_Card.html)[https://raymii.org/s/blog/Broken_Corrupted_Raspberry_Pi_SD_Card.html]
