---
layout: wiki
title: Testing
comments: false
toc: true
editurl: wiki/testing.md
---

#JUnit

##Dependencies##

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
</dependency>
```

#Mockito

##Dependencies

mockito-core

```xml
<!-- needs extra dependencies: objenesis & hamcrest -->
<groupId>org.mockito</groupId>
<artifactId>mockito-core</artifactId>
<version>1.9.5</version>
<scope>test</scope>
```

mockito-all

```xml
<groupId>org.mockito</groupId>
<artifactId>mockito-all</artifactId>
<version>1.9.5</version>
<scope>test</scope>
```

##JRunner

```java
@RunWith(MockitoJUnitRunner.class)
```

#Hamcrest
Matchers
##Refs
 * http://java.dzone.com/articles/hamcrest-containing-matchers

##Dependencies

```xml
<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-all</artifactId>
    <version>1.3</version>
    <scope>test</scope>
</dependency>
```

#Fest
Dependency:

```xml
<dependency>
  <groupId>org.easytesting</groupId>
  <artifactId>fest-assert</artifactId>
  <version>1.4</version>
</dependency>
```

Import:

```java
import static org.fest.assertions.Assertions.assertThat;
```

Use:

```java
public void testMain() {
    List<String> dummyList = Arrays.asList("a","b","c");
    assertThat(dummyList).containsOnly("a","c","b");
}
```
#AssertJ
Dependency:

```xml
<dependency>
  <groupId>org.assertj</groupId>
  <artifactId>assertj-core</artifactId>
  <!-- use 3.1.0 for Java 8 projects -->
  <version>2.2.0</version>
  <scope>test</scope>
</dependency>
```

Import:

```java
import static org.assertj.core.api.Assertions.*;
```

Use:

```java
public void testMain() {
    List<String> dummyList = Arrays.asList("a","b","c");
    assertThat(dummyList).containsOnly("a","c","b");
}
```

Reference:

* [https://code.google.com/p/fest/](https://code.google.com/p/fest/)
* [https://github.com/alexruiz/fest-assert-2.x/wiki/One-minute-starting-guide](https://github.com/alexruiz/fest-assert-2.x/wiki/One-minute-starting-guide)
* [http://thomassundberg.wordpress.com/2011/04/24/fest-assert-a-fluent-interface-for-assertions/](http://thomassundberg.wordpress.com/2011/04/24/fest-assert-a-fluent-interface-for-assertions/)
