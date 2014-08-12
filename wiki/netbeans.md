---
layout: wiki
title: Netbeans
comments: false
toc: false
editurl: wiki/netbeans.md
---

# Shortcuts

Editing:

* `ctrl + shift + r` - rectangular selection
* `alt + shift + .` - select around

Working with tests:

* `ctrl + alt + t` - open test / testing class
* `ctrl + shift + u` - create test for given class
* `ctrl + F6` - execute tests for the given file
* `ctrl + shift + F6` - debug tests for the given file

Windows:

* `shift + Esc` - maximize current editor
* `ctrl + shift + Enter` - show only editor
* `alt + shift + Enter` - full screen
 
Bookmarks:

* `ctrl + shift + m` - toogle bookmark
* `ctrl + shift + ,` - previous bookmark
* `ctrl + shift + .` - next bookmark
 
Case:
* `ctrl + U U` - to uppercase
* `ctrl + U L` - to lowercase

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
