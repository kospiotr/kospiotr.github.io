---
layout: wiki
title: Java memory
comments: false
---
A quick review of Java memory structure :

1. **Java Heap Size**

 Place to store objects created by your Java application, this is where Garbage Collection takes place, the memory used by your Java application. For a heavy Java process, insufficient Heap size will cause the popular `java.lang.OutOfMemoryError`: Java heap space.
 * `-Xms<size>` - Set initial Java heap size0
 * `-Xmx<size>` - Set maximum Java heap size

 `$ java -Xms512m -Xmx1024m JavaApp`

2. **Perm Gen Size**

 Place to store your loaded class definition and metadata. If a large code-base project is loaded, the insufficient Perm Gen size will cause the popular `Java.Lang.OutOfMemoryError`: PermGen.
 * `-XX:PermSize<size>` - Set initial PermGen Size.
 * `-XX:MaxPermSize<size>` - Set the maximum PermGen Size.
 
 `$ java -XX:PermSize=64m -XX:MaxPermSize=128m JavaApp`

3. **Java Stack Size**

 Size of a Java thread. If a project has a lot of threads processing, try reduce this stack size to avoid running out of memory.

 * `-Xss<size>` - Set java thread stack size

 `$ java -Xss512k JavaApp`