---
title: Spring Security
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

# Installing Spring Security

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

The filter must necessarily be named `springSecurityFilterChain` to match the default bean created by Spring Security in the container

The URL pattern used to configure the Filter is /* even though the entire web service is mapped to `/api/*` so that the security configuration has the option to secure other possible mappings as well, if required.

# Configuration

```xml
<?xml version=”1.0” encoding=”UTF-8”?>
<beans:beans
 xmlns=”http://www.springframework.org/schema/security”
 xmlns:xsi=”http://www.w3.org/2001/XMLSchema-instance”
 xmlns:beans=”http://www.springframework.org/schema/beans”
 xmlns:sec=”http://www.springframework.org/schema/security”
 xsi:schemaLocation=”
 http://www.springframework.org/schema/security
 http://www.springframework.org/schema/security/spring-security-3.2.xsd
 http://www.springframework.org/schema/beans
 http://www.springframework.org/schema/beans/spring-beans-4.0.xsd”>
    <http entry-point-ref=”restAuthenticationEntryPoint”>
        <intercept-url pattern=”/api/admin/**” access=”ROLE_ADMIN”/>
        <form-login authentication-success-handler-ref=”mySuccessHandler”
                    authentication-failure-handler-ref=”myFailureHandler”
        />
        <logout />
    </http>
    <beans:bean id=”mySuccessHandler” class=”org.rest.security.MySavedRequestAwareAuthenticationSuccessHandler”/>
    <beans:bean id=”myFailureHandler” class=”org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler”/>
    <authentication-manager alias=”authenticationManager”>
        <authentication-provider>
            <user-service>
                <user name=”temporary” password=”temporary” authorities=”ROLE_ADMIN”/>
                <user name=”user” password=”user” authorities=”ROLE_USER”/>
            </user-service>
        </authentication-provider>
    </authentication-manager>
</beans:beans>
```