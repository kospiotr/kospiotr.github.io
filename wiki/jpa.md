---
layout: wiki
title: JPA
comments: false
toc: false
description: Java Persistence API
editurl: wiki/jpa.md
---

  
##Lazy loading
The default is to load all basic mappings eagerly

Example:

```
 @Basic(fetch=FetchType.LAZY) 
 @Column(name="COMM") 
 private String comments; 
```

##Large Objects
Annotation: `@Lob`

Two types:
* CLOB - character large objects (char[], Character[], and String)
* BLOB - binary large objects (byte[], Byte[] and Serializable types)

Example:

```java
@Entity 
public class Employee { 
 @Id 
 private int id; 
 @Basic(fetch=FetchType.LAZY) 
 @Lob @Column(name="PIC") 
 private byte[] picture; 
 // ... 
}
```
