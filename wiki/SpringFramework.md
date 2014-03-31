---
layout: wiki
title: Spring Framework
comments: false
gallery: true
toc: true
---

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