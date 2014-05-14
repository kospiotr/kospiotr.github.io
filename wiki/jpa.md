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

```java
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

##Enumerated Types
By default Enumerated types are represented as number - an index of value in the enum class.
It is possible to change this behaviour by adding `@Enumerated` annotation with value:

* `EnumType.ORDINAL` - enum represented as enum value index
* `EnumType.STRING` - enum represented as String

Example:

```java
@Entity 
public class Employee { 
 @Id 
 private int id; 
 @Enumerated(EnumType.STRING) 
 private EmployeeType type; 
 // ... 
} 
```




