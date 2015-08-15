---
layout: wiki
title: Spring Framework MVC
comments: false
toc: true
editurl: wiki/spring-framework-mvc.md
res: ../resources/wiki/spring
slideshow: true
---

# Spring MVC Maven dependencies

Add Spring dependencies in ```pom.xml``` :

```xml
	<properties>
		...
		<spring.version>4.2.0.RELEASE</spring.version>
		<jstl.version>1.2</jstl.version>
	</properties>

	<dependencies>
		...
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>${jstl.version}</version>
		</dependency>
	</dependencies>

```

# Register ```DispatcherServlet```

The job of the DispatcherServlet is to take an incoming URI and find the right combination of handlers (generally methods on Controller classes) and views (generally JSPs) that combine to form the page or resource that's supposed to be found at that location.

I might have a file ```/WEB-INF/jsp/pages/Home.jsp``` and a method on a class:

```java
@RequestMapping(value="/pages/Home.html")
private ModelMap buildHome() {
    return somestuff;
}
```

The Dispatcher servlet is the bit that "knows" to call that method when a browser requests the page, and to combine its results with the matching JSP file to make an html document.

How it accomplishes this varies widely with configuration and Spring version.

There's also no reason the end result has to be web pages. It can do the same thing to locate RMI end points, handle SOAP requests, anything that can come into a servlet.

<center>
![JEE]({{page.res}}/dispatcher-servlet.png)
</center>


## The traditional, XML-based approach using ```web.xml```

Most Spring users building a web application will need to register Spring's DispatcherServlet. For reference, in ```WEB-INF/web.xml```. Older servlets containers < 3.0 can be used in this case.

**Option 1: for Spring XML configuration**

```xml
<servlet>
    <servlet-name>dispatcher</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring/app-config.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

See: Spring Configuration in XML way

**Option 2: for Spring Java configuration**

```xml
<servlet>
    <servlet-name>appServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextClass</param-name>
        <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </init-param>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>pl.pkosmowski.hellospring.pl.pkosmowski.hellospring.AppConfig</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

See: Spring Configuration in Java way

## The code-based approach with ```WebApplicationInitializer```
This method uses Servlet 3.0 web hook.

**Remove XML deployment descriptor**

Delete ```web.xml``` config file as we will replace it with ```WebApplicationInitializer```.

When building war archive, Maven will raise exception about missing ```web.xml```. To prevent Maven to fail when no ```web.xml``` add in ```pom.xml``` :

```xml
<plugin>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.6</version>
    <configuration>
        <failOnMissingWebXml>false</failOnMissingWebXml>
    </configuration>
</plugin>
```

**Option 1: for Spring XML configuration**
 
```java
public class AppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext container) {
        XmlWebApplicationContext appContext = new XmlWebApplicationContext();
        appContext.setConfigLocation("/WEB-INF/spring/app-config.xml");
        
        ServletRegistration.Dynamic dispatcher = 
            container.addServlet("dispatcher", new DispatcherServlet(appContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }

}
```

See: Spring Configuration in XML way


**Option 2: for Spring java configuration**

```java
public class AppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext container) {
        AnnotationConfigWebApplicationContext appContext = 
            new AnnotationConfigWebApplicationContext();
        appContext.register(pl.pkosmowski.hellospring.AppConfig.class);
        
        ServletRegistration.Dynamic dispatcher = 
            container.addServlet("dispatcher", new DispatcherServlet(appContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }

}
```

See: Spring Configuration in Java way

# Spring MVC configuration

**Option 1: XML configuration**

Add Spring configuration in ```src/main/webapp/WEB-INF/spring/app-config.xml``` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd 
        http://www.springframework.org/schema/mvc 
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <context:component-scan base-package="pl.pkosmowski.springmvc"/>
    <mvc:annotation-driven/>
    
    <mvc:resources location="/css/" mapping="/css/**"/>
    <mvc:resources location="/img/" mapping="/img/**"/>
    <mvc:resources location="/js/" mapping="/js/**"/>
    
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/WEB-INF/jsp/"/>
		<property name="suffix" value=".jsp"/>
	</bean>
    
</beans>
```

**Option 2: Java configuration**

```java
@Configuration
@ComponentScan({ "pl.pkosmowski.springmvc" })
@EnableWebMvc
public class SpringWebConfig extends WebMvcConfigurerAdapter {
 
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		registry.addResourceHandler("/img/**").addResourceLocations("/img/");
		registry.addResourceHandler("/js/**").addResourceLocations("/js/");
	}
	
	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/jsp/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	}
 
}
```

# Model View Controller

**View**

```/WEB-INF/jsp/SimplePage.jsp``` :

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Hello page</title>
</head>
<body>
	Hello ${name}
</body>
</html>

```

**Controller** :

```SimplePageController.java``` :

```java
@Controller
public class SimplePageController {

	@RequestMapping(value = "/simplePage.html", method = RequestMethod.GET)
	public String displySimplePage(Model model) {
		model.addAttribute("name", "Piotr");
		return "SimplePage";
	}
}
```

* The resource is mapped to the ```/simplePage.html``` resource for GET requests.
* ```InternalResourceViewResolver``` resolves ```SimplePage``` as ```/WEB-INF/jsp/SimplePage.jsp```
* ```Model``` is prepared in Controller and used then in the view.

# Supported methods argument types

Full list can be found here: [http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html#mvc-ann-arguments](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html#mvc-ann-arguments)


**Mapping to path parameter**

```SimplePageController.java``` :

```java
@Controller
public class SimplePageController {

	@RequestMapping(value = "{name}/simplePage.html", method = RequestMethod.GET)
	public String displySimplePage(@PathVariable String name, Model model) {
		model.addAttribute("name", name);
		return "SimplePage";
	}
}
```

Try: ```sampleName/simplePage.html```

**Mapping to query parameter**

```SimplePageController.java``` :

```java
@Controller
public class SimplePageController {

	@RequestMapping(value = "/simplePage.html", method = RequestMethod.GET)
	public String displySimplePage(@RequestParam("name") String name, Model model) {
		model.addAttribute("name", name);
		return "SimplePage";
	}
}
```

Try: ```/simplePage.html?name=sampleName``` 

