---
layout: wiki
title: JavaScript core
comments: false
toc: true
editurl: wiki/js-core.md
---

#Ajax
##Sample post call

```js

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    console.log("got reply: "+xmlhttp.responseText);
    }
  }
xmlhttp.open("POST","/api/costumes",true); xmlhttp.send();

```
