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
* `sudo apt-get install curl openssh-server ca-certificates postfix apt-transport-https`

# Less writing

To prevent your Raspberry Pi's from writing a lot of data, and thus, wearing the SD card, you can mount a few folders in RAM as `tmpfs`. The folders are the folders where temp files and logging is written to. This means that you won't have syslog available, but most of the time that is not a problem.

Edit `/etc/fstab` and add the following:

```
none        /var/run        tmpfs   size=1M,noatime         00
none        /var/log        tmpfs   size=1M,noatime         00
none        /var/tmp        tmpfs   size=1M,noatime         00
none        /tmp            tmpfs   size=1M,noatime         00
```

This will mount the above folders in RAM, with a max size of 1 megabyte. The `noatime` option means that the access time of a file is not updated, saving a lot of writes as well. You should also add the `noatime` option to your other partitions, for example on a standard Raspbian:

```
proc            /proc           proc    defaults          0       0
/dev/mmcblk0p1  /boot           vfat    ro,noatime        0       2
/dev/mmcblk0p2  /               ext4    defaults,noatime  0       1
```

Here the `/boot` partition is also mounted read only (ro). The `noatime` option is added.

Issue a `mount -a` command or reboot the machine to make this active.

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

* Install

```
wget -nv https://download.owncloud.org/download/repositories/stable/Debian_8.0/Release.key -O Release.key
apt-key add - < Release.key
sh -c "echo 'deb http://download.owncloud.org/download/repositories/stable/Debian_8.0/ /' > /etc/apt/sources.list.d/owncloud.list"
apt-get update
apt-get install owncloud
```

* Configure apache to redirect root context from `/owncloud` to `/`:

Edit `/etc/apache2/sites-enabled/000-default.conf` and change the settings of DocumentRoot so that it reads:

```
DocumentRoot /var/www/owncloud
```

Restart Apache: `service apache2 restart`

* Prevent domain instead of redirecting to local host ip

Edit `/var/www/owncloud/config/config.php` and add entries:

```
  'overwritehost' => "sample.domain.com",
  'overwrite.cli.url' => 'http://sample.domain.com/',
```

# Install docker-compose

```
sudo curl -L https://github.com/javabean/arm-compose/releases/download/1.13.0/docker-compose-Linux-armv7l > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```


References: 

* [https://download.owncloud.org/download/repositories/stable/owncloud/](https://download.owncloud.org/download/repositories/stable/owncloud/)
* [http://projpi.com/diy-home-projects-with-a-raspberry-pi/pi-owncloud-drop-box-clone/](http://projpi.com/diy-home-projects-with-a-raspberry-pi/pi-owncloud-drop-box-clone/)



# Resources

* (https://raymii.org/s/blog/Broken_Corrupted_Raspberry_Pi_SD_Card.html)[https://raymii.org/s/blog/Broken_Corrupted_Raspberry_Pi_SD_Card.html]
