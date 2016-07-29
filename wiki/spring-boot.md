---
layout: wiki
title: Spring Boot
comments: false
toc: true
editurl: wiki/spring-boot.md
res: ../../resources/wiki/spring
slideshow: true
---

# What is Spring Boot

Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". They take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need very little Spring configuration.

You can use Spring Boot to create Java applications that can be started using `java -jar` or more traditional `war` deployments.

# Spring Framework vs Spring Boot

{:.text-center}
![Spring Framework]({{page.res}}/spring-ingredients.jpg) 

{:.text-center}
![Spring Boot]({{page.res}}/boot-cake.jpg) 


# Features

* Create stand-alone Spring applications
* Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)
* Provide opinionated 'starter' POMs to simplify your Maven configuration
* Automatically configure Spring whenever possible
* Provide production-ready features such as metrics, health checks and externalized configuration
* Absolutely no code generation and no requirement for XML configuration

You can use [start.spring.io](http://start.spring.io) to generate a basic project and combine required components.

## Basic example

**Maven configuration**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.github.kospiotr</groupId>
    <artifactId>demo-spring-boot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.3.6.RELEASE</version>
        <relativePath/>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

**Configuration**

```java
package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SampleApp {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleApp.class, args);
    }
}
```

**Build project**

```mvn clean install```

**Run app**

```java -jar XXX.jar```

# Building process on the Maven example

## Project dependencies

**Spring Boot dependencies with parent starter**

To inherit Spring Boot defaults:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.3.7.BUILD-SNAPSHOT</version>
</parent>
```

The parent project provides the following features:

* Java 1.6 as the default compiler level.
* UTF-8 source encoding.
* A Dependency Management section, allowing you to omit <version> tags for common dependencies, inherited from the spring-boot-dependencies POM.
* Sensible resource filtering.
* Sensible plugin configuration (exec plugin, surefire, Git commit ID, shade).
* Sensible resource filtering for application.properties and application.yml including profile-specific files (e.g. application-foo.properties and application-foo.yml)

**Spring Boot dependencies without parent starter**

Not everyone likes inheriting from the spring-boot-starter-parent POM. You may have your own corporate standard parent that you need to use, or you may just prefer to explicitly declare all your Maven configuration.

```xml
<dependencyManagement>
     <dependencies>
        <dependency>
            <!-- Import dependency management from Spring Boot -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>1.3.7.BUILD-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Drawbacks:

* No plugin management
* Different way of overriding individual dependencies

# Packaging

Spring Boot project provides `spring-boot-maven-plugin` that by default packages the project as an executable fat-jar:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

Officially plugins for Gradle and Ant are also available.

* Building application: ```mvn package```
* Running built application: ```java -jar app.jar```
* Running application with plugin: ```mvn spring-boot:run```

# Starters

Starters are a set of convenient dependency descriptors that you can include in your application. You get a one-stop-shop for all the Spring and related technology that you need, without having to hunt through sample code and copy paste loads of dependency descriptors. For example, if you want to get started using Spring and JPA for database access, just include the ```spring-boot-starter-data-jpa``` dependency in your project, and you are good to go.

* ```spring-boot-starter-test```
* ```spring-boot-starter-mobile```
* ```spring-boot-starter-social-twitter```
* ```spring-boot-starter-cache```
* ```spring-boot-starter-activemq```
* ```spring-boot-starter-jta-atomikos```
* ```spring-boot-starter-aop```
* ```spring-boot-starter-web```
* ```spring-boot-starter-data-elasticsearch```
* ```spring-boot-starter-jdbc```
* ```spring-boot-starter-batch```
* ```spring-boot-starter-social-facebook```
* ```spring-boot-starter-web-services```
* ```spring-boot-starter-jta-narayana```
* ```spring-boot-starter-thymeleaf```
* ```spring-boot-starter-mail```
* ```spring-boot-starter-jta-bitronix```
* ```spring-boot-starter-data-mongodb```
* ```spring-boot-starter-validation```
* ```spring-boot-starter-jooq```
* ```spring-boot-starter-redis```
* ```spring-boot-starter-data-cassandra```
* ```spring-boot-starter-hateoas```
* ```spring-boot-starter-integration```
* ```spring-boot-starter-data-solr```
* ```spring-boot-starter-freemarker```
* ```spring-boot-starter-jersey```
* ```spring-boot-starter```
* ```spring-boot-starter-data-couchbase```
* ```spring-boot-starter-artemis```
* ```spring-boot-starter-cloud-connectors```
* ```spring-boot-starter-social-linkedin```
* ```spring-boot-starter-velocity```
* ```spring-boot-starter-data-rest```
* ```spring-boot-starter-data-gemfire```
* ```spring-boot-starter-groovy-templates```
* ```spring-boot-starter-amqp```
* ```spring-boot-starter-hornetq```
* ```spring-boot-starter-ws```
* ```spring-boot-starter-security```
* ```spring-boot-starter-data-redis```
* ```spring-boot-starter-websocket```
* ```spring-boot-starter-mustache```
* ```spring-boot-starter-data-neo4j```
* ```spring-boot-starter-data-jpa```

* ```spring-boot-starter-actuator```
* ```spring-boot-starter-remote-shell```

* ```spring-boot-starter-undertow```
* ```spring-boot-starter-logging```
* ```spring-boot-starter-tomcat```
* ```spring-boot-starter-jetty```
* ```spring-boot-starter-log4j2```

## **Web example**

**Stater dependency**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**Configuration**

```java
package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootApplication
@Controller
public class SampleApp {

    @RequestMapping("/hello")
    @ResponseBody
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleApp.class, args);
    }
}
```

Run and go to [http://localhost:8080/hello](http://localhost:8080/hello)

## **Vaadinn example**

**Stater dependency**

```xml
<dependency>
    <groupId>com.vaadin</groupId>
    <artifactId>vaadin-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Vaadin UI**

```java
package app;

import com.vaadin.server.VaadinRequest;
import com.vaadin.spring.annotation.SpringUI;
import com.vaadin.ui.Label;
import com.vaadin.ui.UI;

@SpringUI
public class MyVaadinUI extends UI {
    @Override
    protected void init(VaadinRequest vaadinRequest) {
        setContent(new Label("Hello! I'm the root UI!"));
    }
}
```

Run and go to [http://localhost:8080/hello](http://localhost:8080/hello)


# Bootstraping

* Running class with `main` method. Must be single class or specified (manifest or plugin config)

```java
@EnableAutoConfiguration
public class SampleApp {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleApp.class, args);
    }
}
```

`SpringApplication` - used to bootstrap and launch a Spring application from a Java main method. By default class will perform the following steps to bootstrap your application:

* Create an appropriate `ApplicationContext` instance (depending on your classpath)
* Register a `CommandLinePropertySource` to expose command line arguments as Spring properties
* Refresh the application context, loading all singleton beans
* Trigger any `CommandLineRunner` beans

# Configuration


* Preferred Java configuration over XML
* The same rules as for Spring Framework

**Auto-configuration**

Spring Boot auto-configuration attempts to automatically configure your Spring application based on the jar dependencies that you have added. 
For example, If adding dependency:

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId> 
  <version>1.1.102</version>
</dependency>
```

and you have not manually configured any database connection beans, then we will auto-configure an in-memory database.

**SpringBootApplication** annotation  

`@SpringBootApplication` is to replace popular combination of: `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`

# Developer tools

A toolkit which helps in the development process. It's automatically disabled when running fully packaged application with: `java -jar`.

**Dependency**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

**Additional plugin configuration**

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <fork>true</fork>
    </configuration>
</plugin>
```

**Features**

* apply default properties like disable thymeleaf cache
* automatic restart when classpath changes
* resources are automatically refreshed without restart need - `/META-INF/maven`, `/META-INF/resources`, `/resources`, `/static`, `/public` or `/templates`
* watching additional paths
* live reload - `spring-boot-devtools` module includes an embedded LiveReload server that can be used to trigger a browser refresh when a resource is changed
* global settings in $HOME folder
* remote applications - connecting, updating, reloading and debugging remote applications, for example when using development on the cloud host or in the Docker container

# Properties

Spring Boot allows you to externalize your configuration so you can work with the same application code in different environments. \\
You can use properties files, YAML files, environment variables and command-line arguments to externalize configuration. 

**Usage example**

```java
import org.springframework.stereotype.*
import org.springframework.beans.factory.annotation.*

@Component
public class MyBean {

    @Value("${name}")
    private String name;

    // ...

}
```

**Possible properties sources and loading order**:

* Command line arguments.
* Properties from `SPRING_APPLICATION_JSON` (inline JSON embedded in an environment variable or system property)
* JNDI attributes from `java:comp/env`.
* Java System properties (`System.getProperties()`).
* OS environment variables.
* A RandomValuePropertySource that only has properties in random.*.
* Profile-specific application properties outside of your packaged jar (`application-{profile}.properties` and YAML variants)
* Profile-specific application properties packaged inside your jar (`application-{profile}.properties` and YAML variants)
* Application properties outside of your packaged jar (`application.properties` and YAML variants).
* Application properties packaged inside your jar (`application.properties` and YAML variants).
* `@PropertySource` annotations on your `@Configuration` classes.
* Default properties (specified using `SpringApplication.setDefaultProperties`).

# Profiles

Spring Profiles provide a way to segregate parts of your application configuration and make it only available in certain environments. Any `@Component` or `@Configuration` can be marked with `@Profile` to limit when it is loaded:

```java
@Configuration
@Profile("production")
public class ProductionConfiguration {

    // ...

}
```

Activate:

```
spring.profiles.active=dev,hsqldb
```

# Examples

## Web development

**Dependency**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**Auto-config features**

Spring Boot provides auto-configuration for Spring MVC that works well with most applications.

The auto-configuration adds the following features on top of Spring’s defaults:

* Inclusion of `ContentNegotiatingViewResolver` and BeanNameViewResolver beans.
* Support for serving static resources, including support for WebJars (see below).
* Automatic registration of `Converter`, `GenericConverter`, `Formatter` beans.
* Support for `HttpMessageConverters` (see below).
* Automatic registration of `MessageCodesResolver` (see below).
* Static `index.html` support.
* Custom Favicon support.
* Automatic use of a `ConfigurableWebBindingInitializer` bean (see below).

To add features to above add your own `@Bean` of type `WebMvcConfigurerAdapter`.
To disable auto-configuration and set-up own configuration add own `@Configuration` annotated with `@EnableWebMvc`.

**Supported template engines**

* FreeMarker
* Groovy
* Thymeleaf
* Velocity
* Mustache

> JSPs should be avoided if possible, there are several known limitations when using them with embedded servlet containers.

## Security

* If Spring Security is on the classpath then web applications will be secure by default with ‘basic’ authentication on all HTTP endpoints. 
* To add method-level security to a web application you can also add `@EnableGlobalMethodSecurity` with your desired settings.

**Dependency**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**Auto-config features**

* An AuthenticationManager bean with in-memory store and a single user (see SecurityProperties.User for the properties of the user).
* Ignored (insecure) paths for common static resource locations (/css/**, /js/**, /images/** and **/favicon.ico).
* HTTP Basic security for all other endpoints.
* Security events published to Spring’s ApplicationEventPublisher (successful and unsuccessful authentication and access denied).
* Common low-level features (HSTS, XSS, CSRF, caching) provided by Spring Security are on by default.

**Example configuration**

```java
package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/", "/home.html").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginPage("/login.html")
                    .permitAll()
                    .and()
                .logout()
                .permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("user").password("password").roles("USER");
    }
}
```

## JDBC support

**Dependency**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

**In-memory database support**

Spring Boot can auto-configure embedded H2, HSQL and Derby databases. You don’t need to provide any connection URLs, simply include a build dependency to the embedded database that you want to use.

When adding dependency on the embedded database driver:

```xml
<dependency>
    <groupId>org.hsqldb</groupId>
    <artifactId>hsqldb</artifactId>
    <scope>runtime</scope>
</dependency>
```

Allows to inject fully functional datasource to the application:

```java
@Component
public class MyBean {

    @Autowired
    private final DataSource dataSource;

}
```


**Production datasource**

DataSource configuration is controlled by external configuration properties in ```spring.datasource.*```. For example, you might declare the following section in `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost/test
spring.datasource.username=dbuser
spring.datasource.password=dbpass
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

By default Tomcat pooling DataSource is created but if any other library can be used.

**JdbcTemplates support**

Spring’s `JdbcTemplate` and `NamedParameterJdbcTemplate` classes are auto-configured and you can `@Autowire` them directly into your own beans:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MyBean(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ...

}
```

# Other features

* JPA Support
* Spring Data Support
* NoSQL Support
* NoSQL Support
* Cache
* Messaging
* Sending Emails
* Spring Integration
* Monitoring and JMX

# Testing

**Dependency**

**Dependency**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

Provides following libraries:

* Spring Test — integration test support for Spring applications.
* JUnit — The de-facto standard for unit testing Java applications.
* Hamcrest — A library of matcher objects (also known as constraints or predicates) allowing assertThat style JUnit assertions.
* Mockito — A Java mocking framework.

* It is often desirable to call setWebEnvironment(false) when using SpringApplication within a JUnit test.

# Best practices

* **Properties** - never ship application with environmental properties build in. Properties like datasource, JMS urls or credentials should be delivered by the environmental properties or by the externalized properties files. Only shared properties should be embedded. Profiles and property switch are also bad pattern.
* **Profiles** - don't overuse profiles, they should be used only when structure changes not properties. \\
  *Example 1*: Use when datasource can be derived from jndi or created from properties but don't use it when properties changes between environments! \\
  *Example 2*: When configuring integration test create separated configuration with mocked services instead of using profiles in order to make it more explicit
  *Example 3*: Use when activating deactivating application configuration parts like security, logging aspects, strategies - never hardcode properties!

# Unix launch script

```bash
#!/bin/bash

CMD="$1"
APP="$2"
ENV="$3"

getpid() {
    pid=`pgrep -f "java.*$APP"`
}

status() {
    getpid
    if [ -n "$pid" ]
        then echo "$APP (pid $pid) is running..."
        else echo "$APP is NOT running"
    fi
}

start() {
    getpid
    if [ -n "$pid" ]; then
        echo "$PROJECT (pid $pid) is already running"
        exit 1
    fi
        
    nohup java -jar $APP --env=$ENV --logging.file=$APP.log > /dev/null 2>&1 &
    
    echo -ne "Starting process"
    for i in {1..10}; do
        if ! [ -n "$pid" ]; then
            echo -ne "."
            sleep 1
            getpid
        fi
    done
    echo

    if [ -n "$pid" ]
        then status
        else echo "Error during $PROJECT starting, see log for details."
    fi
}

stop() {
    status
    if [ -n "$pid" ]
    then
        echo -ne "Stopping process"
        kill $pid
        res=$?
        for i in {1..10}; do
            if [ -n "$pid" ]; then
                echo -ne "."
                sleep 1
                getpid
            fi
        done
        echo
        if ! [ -n "$pid" ]
            then echo "$PROJECT has been successfully stopped."
            else echo "Error during $PROJECT stopping... $res"
        fi
    fi
}

usage(){
    echo $"Usage: $0 {start|stop|restart|status} {app-file} {env}"
}

if [ -z "$CMD" ] || [ -z "$APP" ] || [ -z "$ENV" ]; then
    echo "Missing arguments $CMD $APP $ENV"
    usage
    exit 1
fi

case "$CMD" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        stop
        start
        ;;
    *)
        usage
        exit 1
esac

exit 0
```
