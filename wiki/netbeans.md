---
layout: wiki
title: Testing
comments: false
toc: true
---

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