---
layout: wiki
title: Netbeans
comments: false
toc: false
---

# Shortcuts

* `ctrl + alt + t` - open test / testing class
* `ctrl + shift + r` - rectangular selection

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
