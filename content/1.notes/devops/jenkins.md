---
title: Jenkins
---

# Install

* Create user: ```sudo adduser jenkins```
* Add jenkins user as sudoer: ```sudo adduser jenkins sudo```
* Login to that user: ```su jenkins```
* Download Jenkins: ```wget http://mirrors.jenkins.io/war/latest/jenkins.war```
* Create systemd init configuration in file: ```sudo vim /etc/systemd/system/jenkins.service``` with following content:

```
[Unit]
Description=Jenkins Daemon

[Service]
ExecStart=/usr/bin/java -jar /home/jenkins/jenkins.war --httpPort=8081
User=jenkins

[Install]
WantedBy=multi-user.target
```

* Reload service manager: ```sudo systemctl daemon-reload``` and you can now manage the service:

```
systemctl start jenkins.service      # starts the service manually
systemctl stop jenkins.service
systemctl restart jenkins.service
systemctl enable jenkins.service     # enable the service to start with system startup;
                                     # please note that it does not start the service instantly
systemctl disable jenkins.service    # disable automatic start
journalctl -u jenkins.service        # browse logs
```

* Enable Jenkins service to boot at system start: ```systemctl enable jenkins.service```
* Run Jenkins: ```systemctl start jenkins.service``` or restart host
* Log in using following port: 8081
