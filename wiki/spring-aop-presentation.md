---
layout: wiki
title: Spring AOP (Presentation)
comments: false
toc: true
editurl: wiki/spring-aop-presentation.md
res: ../../resources/wiki/spring
slideshow: true
---

# Aspect Oriented Programming

**What is it?**

* is a programming paradigm
* extends OOP
* enables modularization of crosscutting concerns
* is second heart of Spring Framework 

**Sample usages**

Cross cutting layer functionality like:

* security
* transactional
* logging
* monitoring
* cache

{:.text-center}
![ee-cross-layer-aop]({{page.res}}/ee-cross-layer-aop.png)

**Example**

A simple service method:

```java
public Order getOrder(BigDecimal orderId) {
 return (Order) factory.openSession().get(Order.class, orderId);
}
```

Add permissions check:

```java
public Order getOrder(BigDecimal orderId) {
 if (hasOrderPermission(orderId)) {
 return (Order) factory.openSession()
 .get(Order.class, orderId);
 } else {
 throw new SecurityException("Access Denied");
 }
}
```

Add transaction management:

```java
public Order getOrder(BigDecimal orderId) {
 if (hasOrderPermission(orderId)) {
 Order order;
 Session session = factory.openSession();
 Transaction tx = session.beginTransaction();
try {
 order = (Order) session.get(Order.class, orderId);
 tx.commit();
} catch (RuntimeException e) {if (tx!=null) {tx.rollback();}
} finally {session.close();}
 return order;
 } else { throw new SecurityException("Access Denied");}
}
```

Add cache:

```java
public Order getOrder(BigDecimal orderId) {
 if (hasOrderPermission(orderId)) {
 Order order = (Order)cache.get(orderId);
 if (order==null) {
Session session = factory.openSession();
Transaction tx = session.beginTransaction();
try {
 order = (Order) session.get(Order.class, orderId);
 tx.commit();
 cache.put(orderId, order);
} catch (RuntimeException e) {if (tx!=null) {tx.rollback();}
} finally {session.close();}
 }
 return order;
 } else { throw new SecurityException("Access Denied");}
}
```

## What does AOP solve?

{:.text-center}
![ee-cross-layer-aop]({{page.res}}/aop-layers.png)

## AOP concepts

**Key words**

* **join point** - any identifiable places in the program 
* **pointcut** - defined collection of join points
* **advice** - logic implementation executed before, after or instead of reaching pointcut
* **aspect** - combination of advices and pointcuts; decides what should be executed in which place
* **introduction** - adding to new fields, methods, interfaces implementations to the class
* **target object** - object enriched with new logic
* **AOP proxy** - proxy object which encapsulates target object and adds new logic by the given aspects
* **weaving** - process of adding aspect to target object
    * compile time
    * load time
    * runtime

**OOP vs AOP**

* OOP (Object Orianted Programming) composes application into object relation
* AOP (Aspect Oriented Programming) composes application into aspects
* AOP completes OOP and allows
    * static hierarchy object enrichment
    * introduce new functionalities
    * grouping similar concepts in decoupled classes
* Aspect programming and reflection concept fulfill separation of concerns

{:.text-center}
![aop vs oop]({{page.res}}/aop_vs_oop.png)

| **OOP**                                                                              | **AOP**                                                                                 |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| 1. **Class** – code unit that encapsulates methods and attributes                    | 1. **Aspect** – code unit that encapsulates pointcuts, advice, and attributes           |
| 2. **Method signature** – define the entry points for the execution of method bodies | 2. **Pointcut** – define the set of entry points (triggers) in which advice is executed |
| 3. **Method bodies** – implementation of the business logic concerns                 | 3. **Advice** – implementation of cross cutting concern                                 |
| 4. **Compiler** – convert source code to object code                                 | 4. **Weaver** – construct code (source or object) with advice                           |


# Spring AOP

* implemented in pure java
* no need for a special compilation process
* supports only method execution join points
* only runtime weaving is available
* AOP proxy
    * JDK dynamic proxy
    * CGLIB proxy
* configuration
    * @AspectJ annotation-style
    * Spring XML configuration-style

## Aspect

Aspect declare:

```java
@Aspect
public class EmptyAspect {
}
```

XML Configuration:

```xml
<!--<context:annotation-config />-->
<aop:aspectj-autoproxy proxy-target-class="false | true"/>
<bean class="org.springframework.aop.aspectj.annotation.AnnotationAwareAspectJAutoProxyCreator"></bean>
<bean class="example.EmptyAspect"/>
```

* proxy-target-class="false" - used JDK Proxy
* proxy-target-class="true" - used CGLIB

## Pointcut

Sample pointcut declaration and composition:

```java
@Aspect
public class ItemStatusTracker {

 @Pointcut("execution(* approve(..))")
 public void ifApprove() {}

 @Pointcut("execution(* reject(..))")
 public void ifReject() {}
 
 @Pointcut("ifApprove() || ifReject()")
 public void ifStateChange() {}
}
```

Execution examples:

```java
@Aspect
public class ItemStatusTracker {

    @Pointcut("execution(public * * (..))")
    public void anyPublicMethods() {}
    
    @Pointcut("execution(* get*(..))")
    public void anyMethodsThatStartsWithGet() {}
    
    @Pointcut("execution(* bank.BankService.*(..))")
    public void anyMethodDefinedByAppropriateInterface() {}
    
    @Pointcut("execution(* com.epam.pmc.service.*.*(..))")
    public void anyMethodDefinedByAppropriatePackage() {}

}
```

More examples you can find on: [http://static.springsource.org/spring/docs/3.0.x/spring-frameworkreference/html/aop.html#aop-pointcuts-examples](http://static.springsource.org/spring/docs/3.0.x/spring-frameworkreference/html/aop.html#aop-pointcuts-examples)

## Advice

* associated with a pointcut expression
    * a simple reference to a named pointcut
    * a pointcut expression declared in place
* runs
    * before
    * after returning
    * after throwing
    * after (finally)
    * around
    
Examples:

```java
@Aspect
public class BankAspect {
    
    @Pointcut("execution(public * * (..))")
    public void anyPublicMethod() {}
    
    @Before("anyPublicMethod()")
    public void logBefore(JoinPoint joinPoint) {
      //to do something
    }
    
    @AfterReturning(
      pointcut="execution(* get*(..))",
      returning="retVal")
    public void logAfter(JoinPoint joinPoint, Object retVal) {
    //to do something
    }
    
    @AfterThrowing(
      pointcut = "execution(* bank..*ServiceImpl.add*(..))",
      throwing = "exception")
    public void afterThrowing(Exception exception) {
      //to do something
    }
    
    @Around("@annotation(bank.Cached)")
    public Object aroundCache(ProceedingJoinPoint joinPoint){
      //to do something before
      Object retVal = joinPoint.proceed();
      //to do something after
}
}
```

## XML Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:aop="http://www.springframework.org/schema/aop"
 xsi:schemaLocation="…">
    <aop:config>
    <aop:aspect id="bankAspectId" ref="bankAspect">
        <aop:pointcut id="anyPublicMethod"
            expression="execution(public * * (..))"/>
        <aop:before pointcut-ref="anyPublicMethod" method="logBefore"/>
    </aop:aspect>
    </aop:config>
    <bean id="bankAspect" class="bank.BankAspect"/>
</beans>
```

## How does it work

* Spring creates Proxy for each enriched object. Caller is working on Proxy so beware of using `instanceof` and `==` operators.
* Creating proxy objects is transparent for beans and callers.
* Proxy enrich target object with aspects and the delegates executions.

Proxy overview:

{:.text-center}
![proxy]({{page.res}}/proxy.png)

Proxy chaining:

{:.text-center}
![proxy_chaining]({{page.res}}/proxy-chain.png)

## AOP Proxy

Spring AOP supports two types of proxy that are being created at runtime:

* **JDK dynamic proxy** - can only proxy by interface (so your target class needs to implement an interface, which will also be implemented by the proxy class).
* **CGLIB proxy** - CGLIB (and javassist) can create a proxy by subclassing. In this scenario the proxy becomes a subclass of the target class. No need for interfaces.

So Java Dynamic proxies can proxy: `public class Foo implements iFoo` where CGLIB can proxy: `public class Foo`. 

Reference: [http://stackoverflow.com/questions/10664182/what-is-the-difference-between-jdk-dynamic-proxy-and-cglib](http://stackoverflow.com/questions/10664182/what-is-the-difference-between-jdk-dynamic-proxy-and-cglib)

## Spring AOP vs AspectJ

**Spring AOP**

* no need for a special compilation process
* support only method execution pointcuts
* advise the execution of operations on Spring beans

**AspectJ**

* need AspectJ compiler or setup LTW
* support all pointcuts
* advice all domain objects

# Custom Annotation example

Configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context-3.1.xsd
           http://www.springframework.org/schema/aop 
       http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
       http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">

    <!-- Scans for application @Components to deploy -->
    <context:annotation-config/>
    <context:component-scan base-package="io.github.kospiotr.*" />
    
    <!-- enable AOP -->
    <aop:aspectj-autoproxy/>

</beans>
```

Define Annotation:

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface LogDuration {
   String value();
}
```

Aspect definition:

```java
@Aspect
public class AopExample{

    //for any method with @LogDuration, no matter what the return type, name, or arguments are, call this method 
    @Around("execution(@io.github.kospiotr.aop.LogDuration * *(..)) && @annotation(logDurationAnnotation)")
    public Object logDuration(ProceedingJoinPoint joinPoint, LogDuration logDurationAnnotation) throws Throwable {
       
        //capture the start time 
        long startTime = System.currentTimeMillis();
        
        //execute the method and get the result
        Object result = joinPoint.proceed();
        
        //capture the end time
        long endTime = System.currentTimeMillis();
        
        //calculate the duration and print results
        long duration = endTime - startTime;
        System.out.println(logDurationAnnotation.value()+": "+duration+"ms"); //you should use a logger  
        
        //return the result to the caller
        return result; 
    }

}
```

Use Annotation:

```java
@Component
public class Example{

     @LogDuration("Hello World API") 
     public String getHelloWorld(){
          try {
            Thread.sleep(3000);
          } catch (InterruptedException e) {
            throw new RuntimeException("Sleep Interrupted", e);
          } 
          return "Hello World";
     } 

}
```

Output:

```
Hello World API: 3002ms
```