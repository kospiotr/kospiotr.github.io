---
title: Spring MVC
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

# DispatcherServlet

## What is DispatcherServlet

The job of the `DispatcherServlet` is to take an incoming URI and find the right combination of handlers (generally methods on Controller classes) and views (generally JSPs) that combine to form the page or resource that's supposed to be found at that location.

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


![dispatcher-servlet](/wiki/assets/dispatcher-servlet.png)

## Register DispatcherServlet in ```web.xml```

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

## Register DispatcherServlet using ```WebApplicationInitializer```

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

# Expression Language

**EL Property Access**

Expression language syntax is ```${name}```.
Nested object: ```${firstObj.secondObj}```

**Collection Access Operator**

Reference to the collection: ```${myList[1]} and ${myList[“1”]} ```
Nested collection: ```${myMap[myList[1]]}```

**JSP EL Arithmetic Operators**

Provided for simple calculations in EL expressions: ```+```, ```-```, ```*```, ```/``` or ```div```, ```%``` or ```mod```.

**JSP EL Logical Operators**

They are ```&&``` (and), ```||``` (or) and ```!``` (not).

**JSP EL Relational Operators**

They are ```==``` (eq), ```!=``` (ne), ```<``` (lt), ```>``` (gt), ```<=``` (le) and ```>=``` (ge).


# Tags

## Core tags

**Full documentation**

[http://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/index.html](http://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/index.html)

**Configuration**

```html
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

**Out**

```html
<c:out value="${'<tag> , &'}"/>
```

**Set**

```html
<c:set var="salary" scope="session" value="${2000*2}"/>
<c:out value="${salary}"/>
```

**Remove**

```html
<c:set var="salary" scope="session" value="${2000*2}"/>
<p>Before Remove Value: <c:out value="${salary}"/></p>
<c:remove var="salary"/>
<p>After Remove Value: <c:out value="${salary}"/></p>
```

**If**

```html
<c:set var="salary" scope="session" value="${2000*2}"/>
<c:if test="${salary > 2000}">
   <p>My salary is: <c:out value="${salary}"/><p>
</c:if>
```

**Choose, When, Otherwise**

```html
<c:set var="salary" scope="session" value="${2000*2}"/>
<p>Your salary is : <c:out value="${salary}"/></p>
<c:choose>
    <c:when test="${salary <= 0}">
       Salary is very low to survive.
    </c:when>
    <c:when test="${salary > 1000}">
        Salary is very good.
    </c:when>
    <c:otherwise>
        No comment sir...
    </c:otherwise>
</c:choose>
```

**forEach**

```html
<c:forEach var="i" begin="1" end="5">
   Item <c:out value="${i}"/><p>
</c:forEach>
```

## Spring Form

This tag renders an HTML 'form' tag and exposes a binding path to inner tags for binding. It puts the command object in the PageContext so that the command object can be accessed by inner tags. All the other tags in this library are nested tags of the form tag.

**Configuration**

```html
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
```

**Form**

```html
<form:form commandName="user">
    <table>
        <tr>
            <td>First Name:</td>
            <td><form:input path="firstName" /></td>
        </tr>
        ...
    </table>
</form:form>
```

**Input**

```
<form:input path="firstName" />
```

**Checkbox**

```html
<td>
    Quidditch: <form:checkbox path="interests" value="Quidditch"/>
    Herbology: <form:checkbox path="interests" value="Herbology"/>
    Defence Against the Dark Arts: <form:checkbox path="interests" value="Defence Against the Dark Arts"/>
</td>
```

**Checkboxes**

```html
<form:checkboxes path="preferences.interests" items="${interestList}"/>
```

**Radiobutton**

```html
<tr>
    <td>Sex:</td>
    <td>
        Male: <form:radiobutton path="sex" value="M"/> <br/>
        Female: <form:radiobutton path="sex" value="F"/>
    </td>
</tr>
```

**Radiobuttons**

```html
<tr>
    <td>Sex:</td>
    <td><form:radiobuttons path="sex" items="${sexOptions}"/></td>
</tr>
```

**Password**

```html
<tr>
    <td>Password:</td>
    <td>
        <form:password path="password" value="^76525bvHGq" showPassword="true" />
    </td>
</tr>
```

**Select**

Multiselect UI controller:

```html
<tr>
    <td>Skills:</td>
    <td><form:select path="skills" items="${skills}"/></td>
</tr>
```

**Option**

Singleselect UI controller:

```html
<tr>
    <td>House:</td>
    <td>
        <form:select path="house">
            <form:option value="Gryffindor"/>
            <form:option value="Hufflepuff"/>
            <form:option value="Ravenclaw"/>
            <form:option value="Slytherin"/>
        </form:select>
    </td>
</tr>
```

**Options**

```html
<tr>
    <td>Country:</td>
    <td>
        <form:select path="country">
            <form:option value="-" label="--Please Select"/>
            <form:options items="${countryList}" itemValue="code" itemLabel="name"/>
        </form:select>
    </td>
</tr>
```

**Textarea**

```html
<tr>
    <td>Notes:</td>
    <td><form:textarea path="notes" rows="3" cols="20" /></td>
    <td><form:errors path="notes" /></td>
</tr>
```

**Hidden**

```html
<form:hidden path="house" />
```

**Errors**

```html
<form:form>

    <form:errors path="*"/>
    
    <table>
        <tr>
            <td>First Name:</td>
            <td><form:input path="firstName" /></td>
            <td><form:errors path="firstName" /></td>
        </tr>
        
        ...

    </table>
</form:form>
```

## Spring Security

**Configuration**

```html
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
```

**Authorize**


```hasRole``` :

```html
<sec:authorize access="hasRole('supervisor')">

This content will only be visible to users who have the "supervisor" authority in their list of <tt>GrantedAuthority</tt>s.

</sec:authorize>
```

```hasPermission``` :

```html
<sec:authorize access="hasPermission(#domain,'read') or hasPermission(#domain,'write')">

This content will only be visible to users who have read or write permission to the Object found as a request attribute named "domain".

</sec:authorize>
```

```url``` :

```html
<sec:authorize url="/admin">

This content will only be visible to users who are authorized to send requests to the "/admin" URL.

</sec:authorize>
```

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

# Validation

**Add JSR-330 dependencies**

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>5.1.3.Final</version>
</dependency>
```

**View**

All messages:

```html
<form:errors path="*"/>
```

For particular field:

```html
<form:errors path="name"/>
```

Mind that ```<form:error/>``` tag must be inside ```<form:form/>``` tag.

**Controller**

```java
@RequestMapping(value = "/simplePage.html", method = RequestMethod.POST)
public String getPage(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
    logger.info("Saving: " + user);
    logger.info("Has errors: " + bindingResult.hasErrors());
    if (bindingResult.hasErrors()) {
        return "user";
    } else {
        User createdUser = userRepository.add(user);
        return "redirect:user.html?id=" + createdUser.getId();
    }
}
```

# REST services

**Marshaller/Unmarshaller dependencies**

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.5.3</version>
</dependency>
```

**Controller**

```java
@RestController
@RequestMapping("/rest/loan")
public class LoanRestController {

	private Logger logger = Logger.getLogger(LoanRestController.class.getName());

	@Autowired
	private LoanService loanService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Loan> findAll() {
		return loanService.findAllLoans();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Loan getById(@PathVariable("id") Integer id) {
		return loanService.getById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Loan create(@RequestBody Loan loan) {
		loan.setId(null);
		return loanService.save(loan);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Loan put(@PathVariable("id") Integer id, @RequestBody Loan loan) {
		loan.setId(id);
		return loanService.save(loan);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Integer id) {
		loanService.delete(id);
	}

}
```

# Localization

...

# Customize error pages


```java
@ResponseStatus( value = HttpStatus.BAD_REQUEST )
public class BadRequestException extends RuntimeException{
 //
}

@ResponseStatus( value = HttpStatus.NOT_FOUND )
public class ResourceNotFoundException extends RuntimeException{
 //
}
```
