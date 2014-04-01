---
layout: wiki
title: I/O
comments: false
editurl: wiki/io.md
---
#Write as file
```java
java.io.PrintWriter pw = new java.io.PrintWriter("C:/debug.txt");
pw.println(text);
pw.close();
```