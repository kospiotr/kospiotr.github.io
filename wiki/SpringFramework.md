---
layout: wiki
title: Spring Framework
comments: false
gallery: true
toc: true
editurl: wiki/SpringFramework.md
---

#Introduction
##History
###Java Enterprise Edition
Before Spring Framework Enterprise applications has been developed using JavaEE (EJB2). Some major drawbacks:

 * very complicated
 * unclear workflow
 * many XML files with configuration
 * environment poluted logic (had to extends abstract classes, implement JavaEE interfaces)
 * hard to write unit tests
 * very weak Time To Market
 * requires Application Server - special container where Enterprise applications can be deployed
  * different servers (open, commercial)
  * they differently implement specification

<center>
![JEE](http://www.ibm.com/developerworks/websphere/library/techarticles/0707_barcia/0707_barcia_images/figure1a.gif)
</center>

###The book
Rod Johnson between 1997 and 2002 was dealing with J2EE applications as a consultant. He identified many problems during his carrere and described them in his book "Expert One-on-One J2EE Design and Development".

<center>
![Expert One-on-One J2EE Design and Development](http://ecx.images-amazon.com/images/I/51D67wYiL8L._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg)

"Expert One-on-One J2EE Design and Development" - Rod Johnson, Jurgen Hoeller (2002)
</center>

He published there analysys of the problems with the code that implements framework *Interface21* which was demonstrating how to solve those problems. This framework we would call today injection container.

###Spring Framewor versions

<center>
![Spring Logo](http://upload.wikimedia.org/wikipedia/de/9/9d/Spring_Logo.png)
</center>

 * Spring 1.0 – 2004
 * Spring 2.0 – 2006
 * Spring 2.5 – 2007
 * Spring 3.0 – 2009
 * Spring 3.1 - 2011
 * Spring 3.2 - 2013
 * Spring 4.0 - 2013

Very stable and frequent release plan.

#Quick start using maven

##Prerequires
 * JDK > 1.6
 * Maven >= 3

##Step by step
[http://projects.spring.io/spring-framework/#quick-start](http://projects.spring.io/spring-framework/#quick-start)

**Create empty Maven project from archetype**

Command:

```
mvn
    -DarchetypeGroupId=org.apache.maven.archetypes
    -DarchetypeArtifactId=maven-archetype-quickstart
    -DarchetypeVersion=1.1
    -DgroupId=com.github.pkosmowski
    -DartifactId=01-HelloSpring
    -Dversion=1.0-SNAPSHOT
    -Dpackage=com.github.pkosmowski.hellospring
```

Structure:

```
01-HELLOSPRING
│   pom.xml
│
└───src
    ├───main
    │   └───java
    │       └───com
    │           └───github
    │               └───pkosmowski
    │                   └───hellospring
    │                           App.java
    │
    └───test
        └───java
            └───com
                └───github
                    └───pkosmowski
                        └───hellospring
                                AppTest.java
```

`pom.xml`:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.github.pkosmowski</groupId>
    <artifactId>01-HelloSpring</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>01-HelloSpring</name>
    <url>http://maven.apache.org</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>

```

**Add Maven dependendency for Spring**

`pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>4.0.3.RELEASE</version>
    </dependency>
</dependencies>
```

**Create sample entry point to the application**

```java
package com.github.pkosmowski.hellospring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext(
                new String[]{"spring.xml"}
        );

        BankingApp bankingApp = context.getBean("bankingApp", BankingApp.class);
        System.out.println("bankingApp account balance= " + bankingApp.getAccountBalance());
    }

    public static class BankingApp {

        double accountBalance = 100;

        public double getAccountBalance() {
            return accountBalance;
        }
    }
}


```

**Create Spring configuration in the classath**

`spring.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bankingApp" class="com.github.pkosmowski.hellospring.BankingApp"/>

</beans>
```