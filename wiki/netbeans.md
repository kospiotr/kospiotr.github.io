---
layout: wiki
title: Netbeans
comments: false
toc: false
editurl: wiki/netbeans.md
---

# Shortcuts

Editing:
* `ctrl + alt + t` - open test / testing class
* `ctrl + shift + u` - create test for given class
* `ctrl + shift + r` - rectangular selection
* `alt + shift + .` - select around
 
Windows:
* `shift + Esc` - maximize current editor
* `ctrl + shift + Enter` - show only editor
* `alt + shift + Enter` - full screen
 
Bookmarks:
* `ctrl + shift + m` - toogle bookmark
* `ctrl + shift + ,` - previous bookmark
* `ctrl + shift + .` - next bookmark

# Templates
* Test method (tm):

```java
@${testannotation type="org.junit.Test" default="Test" editable="false"}
public void test${expr newVarName default="Method"}()throws Exception
{
    ${selection}${cursor}
}
```

* Test method with exception (tme):

```java
@${testannotation type="org.junit.Test" default="Test" editable="false"}(expected = ${exc default="Exception"}.class )
public void test${expr newVarName default="Method"}()throws Exception
{
    ${selection}${cursor}
}
```
