---
layout: wiki
title: Tomato router
comments: false
toc: true
editurl: wiki/tomato-router.md
---

# Enable 80 port for WAN connections

Because the service is running on the router we can’t use the gui port forwarding section however you can either add `iptables -t filter -A INPUT -p tcp –dport 80 -j ACCEPT` via router gui at `Administration -> Scripts -> Firewall` tab.
