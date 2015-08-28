---
layout: wiki
title: Spring Framework Security
comments: false
toc: true
editurl: wiki/spring-security.md
res: ../resources/wiki/spring
slideshow: true
---

# Spring Security Maven dependencies

```xml
	<properties>
		...
		<spring-security.version>4.0.1.RELEASE</spring-security.version>
	</properties>

	<dependencies>
		...
		<dependency>
		    <groupId>org.springframework.security</groupId>
		    <artifactId>spring-security-web</artifactId>
		    <version>${spring-security.version}</version>
		</dependency>
		<dependency>
		    <groupId>org.springframework.security</groupId>
		    <artifactId>spring-security-config</artifactId>
		    <version>${spring-security.version}</version>
		</dependency>
	</dependencies>
```

# Configure Spring Security

**Define Spring Security in the root Application Context**

```web.xml``` :

```xml
...
    <!-- Loads Root Context -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring/security-config.xml</param-value>
    </context-param>
... 
```

**Add Spring Security filter**

```xml
...
    <!-- Spring Security -->
    <filter>
        <filter-name>springSecurityFilterChain</filter-name>
        <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
    </filter>

    <filter-mapping>
        <filter-name>springSecurityFilterChain</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
...
```
