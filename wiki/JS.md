---
layout: wiki
title: JavaScript
comments: false
toc: false
description: Java Script notes
---

#JSON

* `JSON.stringify(value[, replacer [, space]])` - serialize JS object to JSON
 Examples:
 ```javascript
JSON.stringify({});                  // '{}'
JSON.stringify(true);                // 'true'
JSON.stringify("foo");               // '"foo"'
JSON.stringify([1, "false", false]); // '[1,"false",false]'
JSON.stringify({ x: 5 });            // '{"x":5}'
JSON.stringify({x: 5, y: 6});        // '{"x":5,"y":6}' or '{"y":6,"x":5}'
JSON.stringify({ uno: 1, dos : 2 }, null, '\t')
// returns the string:
// '{            \
//     "uno": 1, \
//     "dos": 2  \
// }'
 ```

#Debugger

* `debugger;` - stops debugger while execution this line of the code
