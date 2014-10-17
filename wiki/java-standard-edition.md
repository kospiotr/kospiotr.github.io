---
layout: wiki
title: Java SE
comments: false
description: Java Standard Edition
editurl: wiki/java-standard-edition.md
---

#General

`jar tvf jarfile.jar` - display content of file

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
