---
layout: wiki
title: Generics
comments: false
editurl: wiki/generics.md
---
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