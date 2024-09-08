---
layout: post
title:  "Super Dev Mode recompile with shortcut"
description: "How to use keyboard shortcut to recompile GWT application in Super Dev Mode"
date:   2014-03-22 22:16:00
---
Instead of using bookmark to recompile GWT module in Super Dev Mode you can use shortcuts. Step by step:

 * Install [Shortcut Manager](https://chrome.google.com/webstore/detail/shortcut-manager/mgjjeipcdnnjhgodgjpfkffcejoljijf/related?hl=en)
 * Add new shortcut:
  * Shortcut key: `ctrl+r`
  * Url pattern. For example: `http://localhost:8080/App*`
  * Copy content of your bookmark and decode it from url form using for example (dencoder)[http://meyerweb.com/eric/tools/dencoder/] and copy content that is surrounded with `javascript:{` and `}`
  * Alternatively you can use this configuration and adopt it to your project:

 ```
 window.__gwt_bookmarklet_params = {server_url:'http://localhost:9876/',module_name:'App'}; var s = document.createElement('script'); s.src = 'http://localhost:9876/dev_mode_on.js'; void(document.getElementsByTagName('head')[0].appendChild(s));
 ```
 
  * Add description
  * Save it

Next time you want recompile use ctrl+r and voilà.
