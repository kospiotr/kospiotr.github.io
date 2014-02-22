---
layout: wiki
title: Testing
comments: false
toc: true
---
#Maven

##Configure integration tests

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <excludes>
      <exclude>**/*IT.java</exclude>
    </excludes>
  </configuration>
  <executions>
    <execution>
      <id>integration-test</id>
      <goals>
        <goal>test</goal>
      </goals>
      <phase>integration-test</phase>
      <configuration>
        <excludes>
          <exclude>none</exclude>
        </excludes>
        <includes>
          <include>**/*IT.java</include>
        </includes>
      </configuration>
    </execution>
  </executions>
</plugin>
```

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
Reference:

* [https://code.google.com/p/fest/](https://code.google.com/p/fest/)
* [https://github.com/alexruiz/fest-assert-2.x/wiki/One-minute-starting-guide](https://github.com/alexruiz/fest-assert-2.x/wiki/One-minute-starting-guide)
* [http://thomassundberg.wordpress.com/2011/04/24/fest-assert-a-fluent-interface-for-assertions/](http://thomassundberg.wordpress.com/2011/04/24/fest-assert-a-fluent-interface-for-assertions/)