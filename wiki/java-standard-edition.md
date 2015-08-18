---
layout: wiki
title: Java SE
comments: false
description: Java Standard Edition
editurl: wiki/java-standard-edition.md
---

#General

`jar tvf jarfile.jar` - display content of file

#System properties vs Environment variables

System properties are set on the java command line using the ```-Dpropertyname=value``` syntax. They can also be added at runtime using ```System.setProperty(name, value)``` or via the various ```System.getProperties().load()``` methods

Environment variables are set in the OS, eg in linux ```export HOME=/Users/myusername``` or on windows ```SET WINDIR=C:\Windows``` etc, and, unlike properties, may not be set at runtime.

#Generics

To obtainn generic type from the current class:

```java
    private Class<T> clazz;

    public Class<T> getClazzClass() {
        if (clazz == null) {
            this.clazz = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        }
        return clazz;
    }
```
