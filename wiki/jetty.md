---
layout: wiki
title: Jetty
comments: false
toc: true
editurl: wiki/jetty.md
---
# Versions

This document is about Jetty 8 version

* Jetty 6 [http://docs.codehaus.org/display/JETTY/Jetty%20Documentation](http://docs.codehaus.org/display/JETTY/Jetty%20Documentation)
* Jetty 7 [http://wiki.eclipse.org/Jetty](http://wiki.eclipse.org/Jetty)
* Jetty 8 [http://wiki.eclipse.org/Jetty](http://wiki.eclipse.org/Jetty)
* Jetty 9 [http://www.eclipse.org/jetty/documentation/current/](http://www.eclipse.org/jetty/documentation/current/)

# Run Jetty

## Standalone

Create script in jetty folder called start.bat with content:

```bash
c:\opt\jdk\bin\java -jar start.jar
```

## Embedded with Maven plugin

### Plugin

Put in pom.xml plugin info:

```xml
<plugin>
  <groupId>org.mortbay.jetty</groupId>
  <artifactId>jetty-maven-plugin</artifactId>
  <version>8.1.8.v20121106</version>
</plugin>
```

### Configuration - hot-deploy

```xml
<plugin>
	<groupId>org.mortbay.jetty</groupId>
	<artifactId>jetty-maven-plugin</artifactId>
	<version>8.1.8.v20121106</version>
	<configuration>
		<scanIntervalSeconds>1</scanIntervalSeconds>
	</configuration>
</plugin>
```

If running `mvn jetty:run-exploded` then hot deploy is definied by `scanIntervalSeconds` interval

### Running
then execute maven command:

```bash
mvn jetty:run
mvn jetty:run-exploded
mvn jetty:run-war
```

# JNDI

## Variable

### jetty.xml

```xml
<New class="org.eclipse.jetty.plus.jndi.EnvEntry">
  <Arg></Arg>
  <Arg>mySpecialValue</Arg>
  <Arg type="java.lang.Integer">666</Arg>
  <Arg type="boolean">true</Arg>
</New>
```

### java code

```java
InitialContext ic = new InitialContext();
Integer mySpecialValue = (Integer)ic.lookup("java:comp/env/mySpecialValue");
```

### web.xml
Default value might be initialized as follows:

```xml
    <env-entry>
        <env-entry-name>myEnvValue</env-entry-name>
        <env-entry-type>java.lang.Integer</env-entry-type>
        <env-entry-value>555</env-entry-value>
    </env-entry>
```

## Data source

### driver
Download driver and put it in folder `${JETTY}/lib/ext`. In our case it is DerbyClient driver.

### jetty.xml

```xml
<New class="org.eclipse.jetty.plus.jndi.Resource">
  <Arg></Arg>
  <Arg>jdbc/myds</Arg>
  <Arg>
    <New class="org.apache.derby.jdbc.ClientDataSource">
      <Set name="ServerName">localhost</Set>
      <Set name="DatabaseName">sun-appserv-samples</Set>
      <Set name="PortNumber">1527</Set>
      <Set name="User">APP</Set>
      <Set name="Password">APP</Set>
      <Set name="createDatabase">create</Set>
    </New>
  </Arg>
</New>
```

### web.xml

```xml
    <resource-ref>
        <res-ref-name>jdbc/myds</res-ref-name>
        <res-type>javax.sql.DataSource</res-type>
        <res-auth>Container</res-auth>
    </resource-ref>
```

### java code

```java
InitialContext ic = new InitialContext();
DataSource myds = (Integer)ic.lookup("java:comp/env/jdbc/myds");
```

### JPA configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.0" xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd">
    <persistence-unit name="default" transaction-type="RESOURCE_LOCAL">
        <non-jta-data-source>jdbc/myds</non-jta-data-source>
        <exclude-unlisted-classes>false</exclude-unlisted-classes>
        <properties/>
    </persistence-unit>
</persistence>
```
