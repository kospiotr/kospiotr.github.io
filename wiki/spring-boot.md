---
layout: wiki
title: Spring Boot
comments: false
toc: true
slideshow: true
editurl: wiki/spring-boot.md
---

# What is SpringBoot

Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". They take an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need very little Spring configuration.

You can use Spring Boot to create Java applications that can be started using `java -jar` or more traditional `war` deployments.

**Features**

* Create stand-alone Spring applications
* Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)
* Provide opinionated 'starter' POMs to simplify your Maven configuration
* Automatically configure Spring whenever possible
* Provide production-ready features such as metrics, health checks and externalized configuration
* Absolutely no code generation and no requirement for XML configuration

You can use [start.spring.io](http://start.spring.io) to generate a basic project and combine required components.

## Basic web example

**Maven minimal configuration**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.github.kospiotr</groupId>
    <artifactId>test-spring-boot</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- Inherit defaults from Spring Boot -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.3.6.RELEASE</version>
    </parent>

    <!-- Add typical dependencies for a web application -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <!-- Package as an executable jar -->
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

**Configuration and simple Controller**

```java
package hello;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class SampleController {

    @RequestMapping("/")
    @ResponseBody
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleController.class, args);
    }
}
```

**Build project**

```mvn clean install```

**Run app**

```java -jar app.jar```

## Basic non web example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.github.kospiotr</groupId>
    <artifactId>test-spring-boot</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- Inherit defaults from Spring Boot -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.3.6.RELEASE</version>
    </parent>

    <!-- Add typical dependencies for a stand-alone application -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
    </dependencies>

    <!-- Package as an executable jar -->
    <build>
        <finalName>app</finalName>
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
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@EnableAutoConfiguration
public class SampleApp {

    @PostConstruct
    public void onInit() {
        System.out.println("Application started");
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleApp.class, args);
    }
}
```

# Building process on the Maven example

**Parent starter**

Maven users can inherit from the ```spring-boot-starter-parent``` project to obtain sensible defaults. The parent project provides the following features:

* Java 1.6 as the default compiler level.
* UTF-8 source encoding.
* A Dependency Management section, allowing you to omit <version> tags for common dependencies, inherited from the spring-boot-dependencies POM.
* Sensible resource filtering.
* Sensible plugin configuration (exec plugin, surefire, Git commit ID, shade).
* Sensible resource filtering for application.properties and application.yml including profile-specific files (e.g. application-foo.properties and application-foo.yml)

**spring-boot-maven-plugin**

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

**Starters**

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
