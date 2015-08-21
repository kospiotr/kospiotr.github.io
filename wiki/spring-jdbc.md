---
layout: wiki
title: Spring Framework JDBC
comments: false
toc: true
editurl: wiki/spring-framework-mvc.md
res: ../resources/wiki/spring
slideshow: true
---

# Configuration

**Dependencies**

Add Spring dependencies in ```pom.xml``` :

```xml
<properties>
    ...
    <spring-jdbc.version>3.1.3.RELEASE</spring-jdbc.version>
</properties>

<dependencies>
    ...
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>${spring-jdbc.version}</version>
    </dependency>
</dependencies>
```

**Install and configure database**

* Database type: MySQL
* Host: localhost
* Port: ```3306```
* Database: hello_spring
* Login: root
* Password: root

**Configure MySQL Driver**

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.22</version>
</dependency>
```

**Configure Datasource in Spring**

For development purposes:

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/hello_spring"/>
    <property name="username" value="root"/>
    <property name="password" value="root"/>
</bean>
```

For more datasources possibilities check: [Datasources](/wiki/datasources.html)

**Logging**

Dependency for Log4j:

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

Configuration for logging to console + JdbcTemplate in ```log4j.properties```:

```
# Root logger option
log4j.rootLogger=INFO, stdout

# Direct log messages to stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n

log4j.logger.org.springframework.jdbc.core = TRACE
```
