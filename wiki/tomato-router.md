---
layout: wiki
title: Tomato router
comments: false
toc: true
editurl: wiki/tomato-router.md
---

# Enable 80 port for WAN connections

Because the service is running on the router we can’t use the gui port forwarding section however you can either add `iptables -t filter -A INPUT -p tcp –dport 80 -j ACCEPT` via router gui at `Administration -> Scripts -> Firewall` tab.

# Configure reverse proxy with Nginx

Go to `Web Server` and use following configuration:

* Enable Server on Start: true
* Web Server Port: 80
* Allow Remote Access: true
* HTTP Section:

```
server {
listen       80;
server_name  {{alias}};

    location / {
      proxy_pass      {{destination_ip}}:{{destination_port}};
    }
}
```
