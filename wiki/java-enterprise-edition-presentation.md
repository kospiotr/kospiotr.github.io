---
layout: wiki
title: Java Enterprise Edition (Presentation)
comments: false
toc: true
editurl: wiki/java-enterprise-edition-presentation.md
res: ../../resources/wiki/jee
slideshow: true
---

## History

### Software application evolution

**Because of:**
Human needs (laziness) -> process automation

**Thanks to:**

* Stronger hardware
* New language features, like: Procedures, Function, Classess, O. O. Development, Layers, Modules, 
* Libraries, Frameworks
* Return to best practices: Design patterns, Anti patterns, Methodologies

**We have:**

{:.text-center}
![application_size](../../img/size_of_large_projects.jpg)

### Enterprise Applications

Enterprise applications is a software mostly for business that uses standarized mechanisms like:

* Transactions
* Security
* Scalabity
* Concurency
* Messaging
* Remote control
* Persistence

Compare:

* personal/company website, blog, game
* banking transaction system, powerplant management system

### Early Java Enterprise Edition
Before Spring Framework, Enterprise applications was being developed using JavaEE (EJB2). Some major drawbacks:

 * environment polluted logic (had to extends abstract classes, implement JavaEE interfaces)
 * requires Application Server - special container where Enterprise applications can be deployed
     * different servers (open, commercial)
     * they differently implement specification
 * very complicated
 * many XML files with configuration
 * unclear workflow
 * hard to write unit tests
 * very weak Time To Market


{:.text-center}
![JEE]({{ page.res }}/ejb-development.png)


# Introduction

> Java Platform Enterprise Edition it is a set of technologies that reduces costs, development complexity, deployment and maintenance of multilayer server applications.

> Java EE is based on Java SE, which delivers complete, stable safe and secure mechanism for enterprises.

[http://java.sun.com/javaee/](http://java.sun.com/javaee/)

# But what it does actually?

It provides technologies that are commonly used in enterprise applications. Some of these are:

* **Enterprise JavaBeans Technology (EJB)** - business logic
* **Java Servlet Technology (Servlets)** - request-response programming model
* **JavaServer Faces Technology (JSF)** - building web interfaces with MVC design pattern
* **JavaServer Pages Technology (JSP)** - building web interfaces using scriptlets and templates in any text-based format such as HTML or XML
* **Java Persistence API (JPA)** - reading/storing objects from/to databases
* **Java Transaction API (JTA)** - transaction management
* **Java Message Service API (JMS)** - messaging
* **Java API for RESTful Web Services (JAX-RS)** - REST web services
* **Java EE Connector Architecture (JAX-WS)**
* **Contexts and Dependency Injection for the Java EE Platform (CDI)** - contextual Dependency Injection
* **JavaMail API** - sending email notifications
* **Java Authorization Contract for Containers (JACC)** - security layer
* and many more ...


See more at: [http://docs.oracle.com/javaee/6/tutorial/doc/bnacj.html](http://docs.oracle.com/javaee/6/tutorial/doc/bnacj.html)