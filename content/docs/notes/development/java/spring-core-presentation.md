---
title: Spring Core
slideshow: true
---

## History

Java Enterprise Edition was first. See why Spring had to be developed: [Java Enterprise Edition - presentation]({{ site.basepath }}/wiki/java-enterprise-edition-presentation)

### The book
Rod Johnson between 1997 and 2002 was dealing with J2EE applications as a consultant. He identified many problems during his carrere and described them in his book "Expert One-on-One J2EE Design and Development".


![Expert One-on-One J2EE Design and Development](http://ecx.images-amazon.com/images/I/51D67wYiL8L._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg)

"Expert One-on-One J2EE Design and Development" - Rod Johnson, Jurgen Hoeller (2002)


He published there analysys of the problems with the code that implements framework *Interface21* which was demonstrating how to solve those problems. This framework we would call today injection container.

### Dependency Injection

See: [Dependency Injection presentation](/wiki/dependency-injection-presentation)

### Versions


![Spring Logo](http://upload.wikimedia.org/wikipedia/de/9/9d/Spring_Logo.png)


* Spring 1.0   – 2004
* Spring 2.0   – 2006
* Spring 2.5   – 2007
* Spring 3.0   – 2009
* Spring 3.1   - 2011
* Spring 3.2   - 2013
* Spring 4.0   - 2013
* Spring 4.1.0 - 2014
* Spring 4.2.0 - 2015
* Spring 4.3.0 - 2016

Reference: [Spring project releases on Github](https://github.com/spring-projects/spring-framework/releases)

Very stable and frequent release plan.

## Mission

* The main aim is to **simplifying application development**.
* Spring support application development on all levels / layers
* There are many modules and extensions with other popular frameworks eg. View technologies (SpringMVC, Templates, Struts, JSF, WebWork), Persistance (Hibernate, TopLink, JPA, JDBC, JTA, NOSQL), Messaging, Cloud, Many more: [Spring integration projects](http://spring.io/projects)
* Spring doesn't competete with other solutions and technologies which are good. Instead of that it supports theirs integration.
* Spring doesn't forces to be installed on the application server, it doesn't forces speciality API to be used.
* Spring is easy to be used
* Spring enhances developers productivity
* Spring supports in writing high quality software
* Spring supports in writing testable code
* Be alternative for EJB 2.x

## Construction
Spring is made of the following modules:


![(Sprin Components](http://docs.spring.io/spring/docs/4.0.3.RELEASE/spring-framework-reference/htmlsingle/images/spring-overview.png)


[http://docs.spring.io/spring/docs/4.0.3.RELEASE/spring-framework-reference/htmlsingle/#overview-modules](http://docs.spring.io/spring/docs/4.0.3.RELEASE/spring-framework-reference/htmlsingle/#overview-modules)

# Inversion of Control container

Dependency Injection is a principal design pattern used for removing direct dependencies between components of the system. Responsibility for creating objects is delegated outside to object factory - container.

Central to the Spring Framework is its Inversion of Control (IoC) container, which provides a consistent means of configuring and managing Java objects using **reflection**. 

The container is responsible for managing object lifecycles of specific objects:

* creating these objects,
* configuring these objects by wiring them together,
* calling their initialization methods.

## Purpose
Without special container, components initilaisation may look like as follow:

```java
/**
 * Manual BillingService object lifecycle maintenance and its dependencies
 */
public static void main(String[] args){
    //object creation
    BillingService billingService = new BillingService();
    PaymentProcessor cardProcessor = new PaymentProcessor();
    TransactionLog transactionLog = new TransactionLog();

    //configuring these objects by wiring them together
    billingService.setCardProcessor(cardProcessor);
    billingService.setTransactionLog(transactionLog);

    //calling their initialization methods
    billingService.registerBillingServiceToCreditCardVendor();
}
```
Above code is boilerplate and hard to maintain. How above code would look like for the below application configuration:


![Huge dependency graph](/wiki/assets/sample-dependency-graph.png)

## Bean Factory
Bean Factory is a core element of the Spring Inversion of Control container that creates requested objects and resolves dependencies by the given configuration:


![Huge dependency graph](/wiki/assets/bean-factory.png)

Initialization:

```java
public static void main(String[] args) {
    //create Inversion of Control container
    DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();

    //create configuration and populate Inversion of Control container with it
    XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
    reader.loadBeanDefinitions(new ClassPathResource("spring-configuration.xml"));

    //requesting bean from the container by the id
    BillingService billingService = beanFactory.getBean("ruleBillingService", BillingService.class);
    billingService.charge(100);
}
```

Configuration `spring-configuration.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.hellospring.BillingService"/>

</beans>
```

Algorithm:

* The Bean Factory creates objects (Factory pattern).
* If the object require dependency it searches them in the registry (Lookup pattern) 
* inject them to the object (Dependency Injection pattern).
* If the dependency is not yet created, the whole above process applies to the child (recursive lookup).


![Bean Factory](/wiki/assets/bean-factory-with-dependencies.png)

Objects can be obtained by means of either dependency lookup or dependency injection.

* **Dependency lookup** is a pattern where a caller asks the container object for an object with a specific name or of a specific type.

* **Dependency injection** is a pattern where the container passes objects by name to other objects, via either constructors, properties, or factory methods.

## ApplicationContext

`ApplicationContext` extends `BeanFactory` and adds some extra features to it.



![ApplicationContext](/wiki/assets/application-context.png)

```Bean Factory```:

* *Bean instantiation/wiring*

```Application Context```:

* *Bean instantiation/wiring*
* Automatic```BeanPostProcessor``` registration
* Automatic```BeanFactoryPostProcessor``` registration
* Convenient```MessageSource``` access (for i18n)
*```ApplicationEvent``` publication

Then initialisation and configuration changes (simplifies), as```ApplicationContext``` is being used more widely:

```java
public static void main(String[] args) {
    //create Inversion of Control container
    //create configuration and populate Inversion of Control container with it
    ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-configuration.xml");

    //requesting bean from the container by the id
    BillingService billingService = ctx.getBean("ruleBillingService", BillingService.class);
    billingService.charge(100);
}
```

And additionally we have extra features with minimal overhead.

## Beans
Objects created by the container (`BeanFactory` or `ApplicationContext`) are also called managed objects or beans. Only managed objects can be controlled by Spring (injecting dependencies, lifecycle management).


![Bans vs Object instances](/wiki/assets/beans.png)

## Configuration
The container can be configured by **XML files** or **Java classess**.


![Configuration](/wiki/assets/matrix-choose.png)

These sources of data contain the bean definitions which provide the information required to create the beans.

* Reference: [XML way](/wiki/spring-framework-core.html#xml-based-container-configuration)
* Reference: [Java way](/wiki/spring-framework-core.html#java-based-container-configuration)

**Which one is better?**

It depends - there is no easy answer to that question.

* XML - seems to be more elastic
* Annotations - Java code only - syntax validated by the Java Compiler, some people don't like XML, easier to refactor
* Mixed - truly the best option

Resources: [http://stackoverflow.com/questions/8428439/spring-annotation-based-di-vs-xml-configuration](http://stackoverflow.com/questions/8428439/spring-annotation-based-di-vs-xml-configuration)

**Disclaimer**

> Don't confuse component scanning, annotations and Java configuration!

# XML-based container configuration

Configuration file `spring-configuration.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.hellospring.BillingService"/>
</beans>
```

ApplicationContext initialization `App.java`:

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("main.xml","common.xml","rest.xml");
```

## Bean declaration
Simple **bean declaration**:

```xml
<bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"/>
```

**Obtain bean by id**:

```java
BillingService billingService = ctx.getBean("test", BillingService.class);
```

**Obtaining bean by type** (if unique bean class is definied in configuration):

```java
BillingService billingService = ctx.getBean(BillingService.class);
```

Beans can be **lookup as a map** from container where map key is a bean id:

```java
Map<String, BillingService> billingService = ctx.getBeansOfType(BillingService.class);
```

and multiple beans with the same type are declared as follow:

```xml
<bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"/>
<bean id="ruleBillingService2" class="com.github.kospiotr.spring.BillingService"/>
```

**Bean alias** - the bean can have more ids thanks to aliases:

```xml
<bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"/>
<alias name="ruleBillingService" alias="service"/>
```

**Obtain bean by alias** is achieved in a same way as by id:

```java
BillingService service = ctx.getBean("service", BillingService.class);
```

## Factory method
Objects can be manually created by other bean via factory method:

**Static Factory method**:

```xml
<bean id="ruleBillingService"
	class="com.github.kospiotr.spring.BillingServiceStaticFactory" 
	factory-method="createBillingService"/>
```

Is equivalent to:

```java
Object ruleBillingService = BillingServiceStaticFactory.createBillingService();
```

**Non static Factory method**:

```xml
<bean id="ruleBillingServiceFactory"
	class="com.github.kospiotr.spring.BillingServiceFactory"/>
<bean id="ruleBillingService"
	factory-bean="ruleBillingServiceFactory" 
	factory-method="createBillingService"/>
```

Is equivalent to:

```java
BillingServiceFactory ruleBillingServiceFactory = new BillingServiceFactory();
Object ruleBillingService = ruleBillingServiceFactory.createBillingService();
```

## Scopes
Basic scopes:

* **singleton** - (default) scopes a single bean definition to a single object instance per Spring IoC container.
* **prototype** - scopes a single bean definition to any number of object instances.

Only valid in the context of a web-aware Spring ApplicationContext:

* **request** - scopes a single bean definition to the lifecycle of a single HTTP request; that is each and every HTTP request will have its own instance of a bean created off the back of a single bean definition.
* **session** - scopes a single bean definition to the lifecycle of a HTTP Session.
* **global** - session Scopes a single bean definition to the lifecycle of a global HTTP Session. Typically only valid when used in a portlet context.

Given `BillingService.java`:

```java
public class BillingService {

    public BillingService() {
        System.out.println("Constructed BillingService");
    }

}
```

**Singleton** example:

Configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService" 
        scope="singleton"/>
</beans>
```

Application:

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-configuration-singleton.xml");

BillingService service1 = ctx.getBean(BillingService.class);
BillingService service2 = ctx.getBean(BillingService.class);
BillingService service3 = ctx.getBean(BillingService.class);
```

 Result:

```
> Constructed BillingService
```
 
**Prototype** example:

 Configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService" 
        scope="prototype"/>
</beans>
```

 Application:

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-configuration-singleton.xml");

BillingService service1 = ctx.getBean(BillingService.class);
BillingService service2 = ctx.getBean(BillingService.class);
BillingService service3 = ctx.getBean(BillingService.class);
```

 Result:

```
> Constructed BillingService
> Constructed BillingService
> Constructed BillingService
```

## Lifecycle
Spring helps to mange the lifecycle of the objects. It is possible to perform actions:

* after object has been initialized (after all properties has been set up),
* before it will be destroyed (when context goes down).

There are 3 methods how it can be achieved by Spring:

* In the configuration
* By implementing interfaces
* By marking methods with annotations

Given application:

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-configuration-configuration-driven-lifecycle.xml");

BillingService service1 = ctx.getBean(BillingService.class);

((ConfigurableApplicationContext) applicationContext).close(); //forces context to shut down
```

Lifecycle definied in the **XML Configuration** example:

Configuration:

```xml
<bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"
     init-method="init" destroy-method="cleanUp"/>
```

 Bean:

```java
public class BillingService {

    public BillingService() {
        System.out.println("Constructed BillingService");
    }

    public void init() {
        System.out.println("BillingService initialized");
    }

    public void cleanUp() {
        System.out.println("BillingService clean up");
    }
}
```

Lifecycle driven by the **interface** example:

Configuration:

```xml
<bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingServiceLifecycleAware"/>
```

Bean:

```java
public class BillingServiceLifecycleAware implements InitializingBean, DisposableBean {

    public BillingServiceLifecycleAware() {
        System.out.println("Constructed BillingService");
    }

    public void afterPropertiesSet() throws Exception {
        System.out.println("BillingService initialized");
    }

    public void destroy() throws Exception {
        System.out.println("BillingService clean up");
    }
}
```

Result:

```
> Constructed BillingService
> BillingService initialized
> BillingService clean up
```

Lifecycle driven by annotation reference: [Lifecycle with annotations](#lifecycle-with-annotations)

> The most recommended way is using plain configuration, then JSR-330 annotations, and in the end implementing interfaces. Interfaces will tight coupled your code to Spring and annotations bind the code with JSR-330. JSR-330 is pretty common now and this is straightforward convention to configure lifecycle in the application. For libraries development I would suggest using plain configuration.

## Dependency Injection

**Injecting Value**

Simple values:

```xml
<bean ...>
    <property name="sampleString" value="TestingString"/>
    <property name="sampleIntiger" value="100"/>
    <property name="sampleDouble" value="99.99"/>
</ben>
```

List with values:

```xml
<bean ...>
    <property name="sampleList">
        <list>
            <value>pechorin@hero.org</value>
            <value>raskolnikov@slums.org</value>
            <value>stavrogin@gov.org</value>
            <value>porfiry@gov.org</value>
        </list>
    </property>
</bean>
```

List with references:

```xml
<bean ...>
    <property name="sampleList">
        <list>
            <ref bean="bean1"/>
            <ref bean="bean2"/>
            <ref bean="bean3"/>
        </list>
    </property>
</bean>
```

List as a bean:

```xml
<util:list id="aListBean" value-type="com.github.kospiotr.springcore.Foo">
    <bean class="com.github.kospiotr.springcore.FooA"/>
    <bean class="com.github.kospiotr.springcore.FooB"/>
</util:list>
```

> Above method shouldn't be used. Instead use polymorphycal interface and inject all implementing instances using autowire!!

Set:

```xml
<bean ...>
    <property name="sampleSet">
        <set>
            <value>pechorin@hero.org</value>
            <value>raskolnikov@slums.org</value>
            <value>stavrogin@gov.org</value>
            <value>porfiry@gov.org</value>
        </set>
    </property>
</bean>
```

Map:

```xml
<bean ...>
    <property name="sampleMap">
        <map>
            <entry key="pechorin" value="pechorin@hero.org"/>
            <entry key="raskolnikov" value="raskolnikov@slums.org"/>
            <entry key="stavrogin" value="stavrogin@gov.org"/>
            <entry key="porfiry" value="porfiry@gov.org"/>
        </map>
    </property>
</bean>
```

**Injecting Bean**

Inner bean:

```xml
<bean id="billingService" class="com.github.kospiotr.spring.BillingService">
    <property name="creditCardProcessor">
        <bean class="com.github.kospiotr.spring.CreditCardProcessor"/>
    </property>
    <property name="transactionLogger">
        <bean class="com.github.kospiotr.spring.TransactionLogger"/>
    </property>
</bean>
```

Bean reference:

```xml
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
<bean id="billingService" class="com.github.kospiotr.spring.BillingService">
    <property name="creditCardProcessor" ref="creditCardProcessor"/>
    <property name="transactionLogger" ref="transactionLogger"/>
</bean>
```

## Injecting methods

**Modifier (setter)** based injection:

Setter-based DI is accomplished by the container calling setter methods on your beans after invoking a no-argument constructor or no-argument static factory method to instantiate your bean.

```xml
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
<bean id="billingService" class="com.github.kospiotr.spring.BillingService">
    <property name="creditCardProcessor" ref="creditCardProcessor"/>
    <property name="transactionLogger" ref="transactionLogger"/>
</bean>
```

is equivalent to:

```java
CreditCardProcessor creditCardProcessor = new CreditCardProcessor();
TransactionLogger transactionLogger = new TransactionLogger();

BillingService billingService = new BillingService();
billingService.setCreditCardProcessor(creditCardProcessor);
billingService.setBillingService(transactionLogger);

```

**Constructor** based dependency injection:

Constructor-based DI is accomplished when the container invokes a class constructor with a number of arguments, each representing a dependency on other class.

```xml
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
<bean id="billingService" class="com.github.kospiotr.spring.BillingService">
    <constructor-arg name="creditCardProcessor" ref="creditCardProcessor"/>
    <constructor-arg name="transactionLogger" ref="transactionLogger"/>
</bean>
```

is equivalent to:

```java
CreditCardProcessor creditCardProcessor = new CreditCardProcessor();
TransactionLogger transactionLogger = new TransactionLogger();

BillingService billingService = 
        new BillingService(creditCardProcessor, transactionLogger);
```

## Bean definition inheritance

It is possible to inherit bean definition from: 

* the other bean definition
* from abstract bean definition

Given two models:

```java
public class Foo {
   private String message1;
   private String message2;
   
   //Setters and Getters
}

public class Bar {
   private String message1;
   private String message2;
   private String message3;
   
   //Setters and Getters
}
```

**Inheritance definition from other bean**

```bar``` bean has been defined as a child of ```foo``` bean by using ```parent``` attribute. The child bean inherits ```message2``` property as is, and overrides ```message1``` property and introduces one more property ```message3```:

Configuration:

```xml
<bean id="foo" class="com.github.kospiotr.spring.Foo">
  <property name="message1" value="Hello Foo1!"/>
  <property name="message2" value="Hello Foo2!"/>
</bean>

<bean id="bar" class="com.github.kospiotr.spring.Bar" parent="helloWorld">
  <property name="message1" value="Hello Bar1!"/>
  <property name="message3" value="Hello Bar3!"/>
</bean>
```

Executing application:

```java
ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");

Foo objA = (Foo) context.getBean("foo");

System.out.println(objA.getMessage1());
System.out.println(objA.getMessage2());

Bar objB = (Bar) context.getBean("bar");
System.out.println(objB.getMessage1());
System.out.println(objB.getMessage2());
System.out.println(objB.getMessage3());
```

Will result in:

```
> Hello Bar1!
> Hello Foo2!
> Hello Bar2!
```

**Inheritance definition from abstrac bean definition**

You can create a Bean definition template which can be used by other child bean definitions without putting much effort. While defining a Bean Definition Template, you should not specify ```class``` attribute and should specify ```abstract``` attribute with a value of ```true``` as shown below:

```xml
<bean id="beanTeamplate" abstract="true">
  <property name="message1" value="Hello Foo1!"/>
  <property name="message2" value="Hello Foo2!"/>
  <property name="message3" value="Hello Foo3!"/>
</bean>

<bean id="bar" class="com.github.kospiotr.spring.Bar" parent="beanTeamplate">
  <property name="message1" value="Hello Bar1!"/>
  <property name="message3" value="Hello Bar3!"/>
</bean>
```

Will output the same result as above.

## Autowiring

By default beans must be configured for wiring manually. There is mechanism which allows for doing this automatically – **autowiring**. 

Beans can be autowired in 3 ways:

* **byName** – autowiring by property name
* **byType** – autowiring by the dependency type (must be unique)
* **constructor** – similar to byType, but type applies to constructor arguments

Given:

```java
class CreditCardProcessor{
    CreditCardProcessor(){
        System.out.println("Constructed CreditCardProcessor");
    }
}

class TransactionLogger{
    TransactionLogger(){
        System.out.println("Constructed TransactionLogger");
    }
}

class BillingService{
    BillingService(){
        System.out.println("Constructed BillingService");
    }
    
    public void setCreditCardProcessor(CreditCardProcessor creditCardProcessor){
        System.out.println("Injected CreditCardProcessor to BillingService");
    }
    
    public void setTransactionLogger(TransactionLogger transactionLogger){
        System.out.println("Injected TransactionLogger to BillingService");
    }
}

```

* **autowiring by bean -> property name**:

 Autowiring by property name. Spring container looks at the properties of the beans on which autowire attribute is set to byName in the XML configuration file. It then tries to match and wire its properties with the beans defined by the same names in the configuration file.

Configuration:

```xml
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

<bean id="billingService" class="com.github.kospiotr.spring.BillingService" 
    autowire="byName"/>
```

* **autowiring by bean -> property type**:

Autowiring by property datatype. Spring container looks at the properties of the beans on which autowire attribute is set to byType in the XML configuration file. It then tries to match and wire a property if its type matches with exactly one of the beans name in configuration file. If more than one such beans exists, a fatal exception is thrown.

Configuration:

```xml
<bean id="cp" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="tl" class="com.github.kospiotr.spring.TransactionLogger"/>

<bean id="billingService" class="com.github.kospiotr.spring.BillingService" 
    autowire="byType"/>
```

Result in above cases:

```
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
```

# Injecting with Annotations

An alternative to XML setups is provided by annotation-based configuration which rely on the bytecode metadata for wiring up components instead of angle-bracket declarations. 

Instead of using XML to describe a bean wiring, the developer moves the configuration into the component class itself by using annotations on the relevant class, method, or field declaration.

To be able to use annotations you need to add to the configuration following directive:

```xml
<context:annotation-config/>
```

Where schema loaction is:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
...

```

## Autowiring

As mentioned [before](#autowiring), autowiring can be configured using annotations.

```xml
<context:annotation-config/>

<bean id="billingService" class="com.github.kospiotr.spring.BillingServiceAutowireConstructor"/>
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
```

Mind that above configuration defines beans, however it doesn't say how to inject ```creditCardProcessor``` and ```transactionLogger``` to ```billingService```.

Components might be tied by following annotations: ```@Autowired```, ```@Resource```, ```@Inject```. 

Great detailed explination what is the difference can be found in this article: [http://blogs.sourceallies.com/2011/08/spring-injection-with-resource-and-autowired/](http://blogs.sourceallies.com/2011/08/spring-injection-with-resource-and-autowired).


## Autowiring with @Inject and @Autowired

1. Matches by Type
2. Restricts by Qualifiers (```@Named``` or custom Qualifier annotation)
3. Matches by Name

Can mark field, setter or constructor.

* **Constructor**

 Annotation:

```java
@Inject
public BillingServiceAutowireConstructor(CreditCardProcessor creditCardProcessor, TransactionLogger transactionLogger) {
    this.creditCardProcessor = creditCardProcessor;
    this.transactionLogger = transactionLogger;
    System.out.println("Constructed BillingService, and injected CreditCardProcessor and TransactionLogger");
}
```

 Result:

```
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService, and injected CreditCardProcessor and TransactionLogger
```

* **Setter**

 Annotation:

```java
@Inject
public void setCreditCardProcessor(CreditCardProcessor creditCardProcessor) {
    System.out.println("Injected CreditCardProcessor to BillingService");
    this.creditCardProcessor = creditCardProcessor;
}

@Inject
public void setTransactionLogger(TransactionLogger transactionLogger) {
    System.out.println("Injected TransactionLogger to BillingService");
    this.transactionLogger = transactionLogger;
}
```

 Result:

```
> Constructed BillingService
> Constructed CreditCardProcessor
> Injected CreditCardProcessor to BillingService
> Constructed TransactionLogger
> Injected TransactionLogger to BillingService
```

* **Property**

 Annotation:

```java
@Inject
private CreditCardProcessor creditCardProcessor;
@Inject
private TransactionLogger transactionLogger;
```

 Result:

```
> Constructed BillingService
> Constructed CreditCardProcessor
> Constructed TransactionLogger
```

```@Inject``` vs ```@Autowired```
> @Inject is part of the Java CDI standard introduced in Java EE 6 (JSR-299), read more. Spring has chosen to support using @Inject synonymously with their own @Autowired annotation.

> ```@Autowired``` is Spring's own (legacy) annotation. @Inject is part of a new Java technology called CDI that defines a standard for dependency injection similar to Spring. In a Spring application, the two annotations works the same way as Spring has decided to support some JSR-299 annotations in addition to their own.

> Inject guarantee code portability between different Dependency Injectionframeworks ike Spring, Guice, CDI.

Source: [http://stackoverflow.com/questions/7142622/what-is-the-difference-between-inject-and-autowired-in-spring-framework-which](http://stackoverflow.com/questions/7142622/what-is-the-difference-between-inject-and-autowired-in-spring-framework-which)

### Autowiring with @Resource

1. Matches by property Name
2. Matches by Type
3. Restricts by Qualifiers (ignored if match is found by name)

Behaves similary to ```@Autowired``` and ```@Inject``` apart that it ties components first by name then by type.

```@Resource``` optionally takes a name attribute, and by default Spring interprets that value as the bean name to be injected. In other words, it follows by-name semantics.

Configuration:

```xml
<bean id="billingService" class="com.github.kospiotr.spring.BillingServiceResourceNamed"/>
<bean id="creditCardProcessor1" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="creditCardProcessor2" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger1" class="com.github.kospiotr.spring.TransactionLogger"/>
<bean id="transactionLogger2" class="com.github.kospiotr.spring.TransactionLogger"/>
```

Annotation:

```java
@Resource(name = "creditCardProcessor1")
public void setCreditCardProcessor(CreditCardProcessor creditCardProcessor) {
    System.out.println("Injected CreditCardProcessor to BillingService");
    this.creditCardProcessor = creditCardProcessor;
}

public BillingServiceResourceNamed() {
    System.out.println("Constructed BillingService");
}

@Resource(name = "transactionLogger1")
public void setTransactionLogger(TransactionLogger transactionLogger) {
    System.out.println("Injected TransactionLogger to BillingService");
    this.transactionLogger = transactionLogger;
}
```

Application:

```java
BillingServiceResourceNamed billingService = ctx.getBean("billingService", BillingServiceResourceNamed.class);
```

Result:

```
> Constructed BillingService
> Constructed CreditCardProcessor
> Injected CreditCardProcessor to BillingService
> Constructed TransactionLogger
> Injected TransactionLogger to BillingService
> Constructed CreditCardProcessor
> Constructed TransactionLogger
```

### Qualifiers

When using ```@Inject``` or ```@Autowire``` annotations the autowiring is done by type. At this point autowiring by name is possible thanks to ```@Qualifier```:

Configuration:

```xml
<bean id="billingService" class="com.github.kospiotr.spring.BillingServiceResourceNamed"/>
<bean id="creditCardProcessor1" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="creditCardProcessor2" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger1" class="com.github.kospiotr.spring.TransactionLogger"/>
<bean id="transactionLogger2" class="com.github.kospiotr.spring.TransactionLogger"/>
```

Annotation:

```java
@Inject
@Qualifier("creditCardProcessor1")
public void setCreditCardProcessor(CreditCardProcessor creditCardProcessor) {
    System.out.println("Injected CreditCardProcessor to BillingService");
    this.creditCardProcessor = creditCardProcessor;
}

@Inject
@Qualifier("transactionLogger1")
public void setTransactionLogger(TransactionLogger transactionLogger) {
    System.out.println("Injected TransactionLogger to BillingService");
    this.transactionLogger = transactionLogger;
}
```

Result:

```
> Constructed BillingService
> Constructed CreditCardProcessor
> Injected CreditCardProcessor to BillingService
> Constructed TransactionLogger
> Injected TransactionLogger to BillingService
> Constructed CreditCardProcessor
> Constructed TransactionLogger
```

## Lifecycle with annotations

Configuration:

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.github.kospiotr.spring" />
    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingServiceJsr330LifecycleAware"/>
</beans>

```

Bean:

```java
public class BillingServiceJsr330LifecycleAware {

    public BillingServiceJsr330LifecycleAware() {
        System.out.println("Constructed BillingService");
    }

    @PostConstruct
    public void afterPropertiesSet() {
        System.out.println("BillingService initialized");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("BillingService destroyed");
    }
}
```

Application:

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-configuration-annotation-driven-lifecycle.xml");
BillingServiceJsr330LifecycleAware service1 = ctx.getBean(BillingServiceJsr330LifecycleAware.class);
((ConfigurableApplicationContext) applicationContext).close(); //forces context to shut down
```

Result:

```
> Constructed BillingService
> BillingService initialized
> BillingService destroyed

```

## Component scanning

This section describes an option for implicitly detecting the candidate components by scanning the classpath. Candidate components are classes that match against a filter criteria and have a corresponding bean definition registered with the container. This removes the need to use XML to perform bean registration, instead you can use annotations (for example ```@Component```).

To be able to use annotated classes you need to perform scanning them on Spring bootstrap. The scanning is being confugured as follow:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.github.kospiotr.spring"/>

</beans>
```

>The use of <context:component-scan> implicitly enables the functionality of <context:annotation-config>. There is usually no need to include the <context:annotation-config> element when using <context:component-scan>.

Then beans must be marked:

```java
@Component
public class BillingService {

    @Inject
    private CreditCardProcessor creditCardProcessor;

    @Inject
    private TransactionLogger transactionLogger;

    ...
}
```

Components might be marked with following stereotype annotations:

* ```@Service``` - Annotate all your service classes with ```@Service```. All your business logic will be in Service classes.
* ```@Repository``` - Annotate all your DAO classes with ```@Repository```. All your database access logic should be in DAO classes.
* ```@Component``` - Annotate your other components (for example REST resource classes) with component stereotype.
* ```@Named``` - Standarized ```@Component``` annotation.

> ```@Component``` is a generic stereotype for any Spring-managed component. ```@Repository```, ```@Service```, and ```@Controller``` are specializations of ```@Component``` for more specific use cases, for example, in the persistence, service, and presentation layers, respectively.
Reasons to use them:

> The main advantage of using ```@Repository``` or ```@Service``` over ```@Component``` is that it's easy to write an AOP pointcut that targets, for instance, all classes annotated with ```@Repository```.
> You don't have to write bean definitions in context xml file. Instead annotate classes and use those by autowiring.
> Specialized annotations help to clearly demarcate application layers (in a standard 3 tiers application).

# Java-based container configuration

**ApplicationContext initialization** :

```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
```

Configuratino file ```AppConfig.java```:

```java
@Configuration
public class AppConfig {

  ...

}
```

**Bean declaration**

```java
@Configuration
public class AppConfig {

  @Bean
  public BillingService billingServiceBean() {
      return new BillingService();
  }

}
```

Is equivalent to:

```xml
<bean id="billingServiceBean" class="BillingService"/>
```

To rename bean you can specify a parameter:

```java
@Bean(name = "ruleBillingService")
```

**Scopes** :

Default scope is Singleton. To set bean scope, class or method with bean definition can be marked with:

* ```@Scope(value = BeanDefinition.SCOPE_PROTOTYPE)```
* ```@Scope(value = BeanDefinition.SCOPE_SINGLETON)```

**Autowire** :

To inject dependencies for given bean, just use ```@Autowired``` above bean declaration method and specify properties that should be injected:

```java
@Bean
@Autowired
public List<ScoringRule> rulesList(RememberRule remberRule,
        @Qualifier("loanHistory") ScoringRule loanHistoryScoringRule) {
  return [new JobsScoringRule(), remberRule, loanHistoryScoringRule]
}
```

**Component scanning** :

Just mark class with: ```@ComponentScan(basePackages = {"com.github.kospiotr"})```

# Resource access

Spring simplifies accessing external resources.

```java
public interface Resource extends InputStreamSource {
    boolean exists();
    boolean isOpen();
    URL getURL() throws IOException;
    File getFile() throws IOException;
    Resource createRelative(String relativePath) throws IOException;
    String getFilename();
    String getDescription();
}
```

Standard implementations:

* `UrlResource`
* `ClassPathResource`
* `FileSystemResource`
* `ServletContextResource`
* `InputStreamResource`
* `ByteArrayResource`

Obtain resource directly from the context: 

```java
Resource templateRelativePath = ctx.getResource("some/resource/path/myTemplate.txt");
Resource templateClassPath = ctx.getResource("classpath:some/resource/path/myTemplate.txt");
Resource templateFilePath = ctx.getResource("file:/some/resource/path/myTemplate.txt");
Resource templateRemoteUrl = ctx.getResource("http://myhost.com/resource/path/myTemplate.txt");
```

Injecting resources with XML configuration:

```xml
<bean id="myBean" class="...">
    <property name="templateRelativePath" value="some/resource/path/myTemplate.txt"/>
    <property name="templateClassPath" value="classpath:some/resource/path/myTemplate.txt">
    <property name="templateFilePath" value="file:/some/resource/path/myTemplate.txt"/>
</bean>
```

Injecting resource using annotation:

```java
@Component

public class TestBean {

    @Value( "classpath:images/icon.png")
    private Resource iconResource;
}
```

# Container Extension Points

**BeanPostProcessor**:

The ```BeanPostProcessor``` interface defines callback methods that you can implement to provide your own (or override the container’s default) instantiation logic, dependency-resolution logic, and so forth. If you want to implement some custom logic after the Spring container finishes instantiating, configuring, and initializing a bean, you can plug in one or more ```BeanPostProcessor``` implementations.

Definition of custom ```BeanPostProcessor```:

```java
public class SimpleBeanPostProcessor implements BeanPostProcessor {

    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("before bean init = " + beanName);
        return bean;
    }

    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("after bean init = " + beanName);
        return bean;
    }

}
```

Registration:

```xml
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

<bean id="billingService" class="com.github.kospiotr.spring.BillingService">
    <property name="creditCardProcessor" ref="creditCardProcessor"/>
    <property name="transactionLogger" ref="transactionLogger"/>
</bean>

<bean class="com.github.kospiotr.spring.SimpleBeanPostProcessor"/>
```

Result:

```
> Constructed CreditCardProcessor
> before bean init = creditCardProcessor
> after bean init = creditCardProcessor
> Constructed TransactionLogger
> before bean init = transactionLogger
> after bean init = transactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
> before bean init = billingService
> after bean init = billingService
```

**BeanPostProcessorFactory**:

The next extension point that we will look at is the `org.springframework.beans.factory.config.BeanFactoryPostProcessor`. The semantics of this interface are similar to those of the `BeanPostProcessor`, with one major difference: `BeanFactoryPostProcessor` operates on the bean configuration metadata; that is, the Spring IoC container allows a `BeanFactoryPostProcessor` to read the configuration metadata and potentially change it before the container instantiates any beans other than `BeanFactoryPostProcessors`.


Definition of custom `BeanFactoryPostProcessor`:

```java
public class SimpleBeanFactoryPostProcessor implements BeanFactoryPostProcessor {

    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        System.out.println("PostProcess: " + 
            Arrays.toString(beanFactory.getBeanDefinitionNames())
        );
    }

}
```

Registration:

```xml
<bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
<bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

<bean id="billingService" class="com.github.kospiotr.spring.BillingService">
    <property name="creditCardProcessor" ref="creditCardProcessor"/>
    <property name="transactionLogger" ref="transactionLogger"/>
</bean>

<bean class="com.github.kospiotr.spring.SimpleBeanFactoryPostProcessor"/>
```

Result:

```
> PostProcess: [creditCardProcessor, transactionLogger, billingService, com.github.kospiotr.spring.S impleBeanFactoryPostProcessor#0]
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
```

**Sample implementations**:

Some of those extensions are core that are enabled by default by `ApplicationContext`.

PostProcessors:

* `AdvisorAdapterRegistrationManager`,
* `AnnotationAwareAspectJAutoProxyCreator`,
* `AspectJAwareAdvisorAutoProxyCreator`,
* `AsyncAnnotationBeanPostProcessor`,
* `AutowiredAnnotationBeanPostProcessor`,
* `BeanNameAutoProxyCreator`,
* `BeanValidationPostProcessor`,
* `CommonAnnotationBeanPostProcessor`,
* `DefaultAdvisorAutoProxyCreator`,
* `InfrastructureAdvisorAutoProxyCreator`,
* `InitDestroyAnnotationBeanPostProcessor`,
* `InstantiationAwareBeanPostProcessorAdapter`,
* `LoadTimeWeaverAwareProcessor`,
* `MethodValidationPostProcessor`,
* `PersistenceAnnotationBeanPostProcessor`,
* `PersistenceExceptionTranslationPostProcessor`,
* `PortletContextAwareProcessor`,
* `RequiredAnnotationBeanPostProcessor`,
* `ScheduledAnnotationBeanPostProcessor`,
* `ScriptFactoryPostProcessor`,
* `ServerEndpointExporter`,
* `ServletContextAwareProcessor`,
* `SimplePortletPostProcessor`,
* `SimpleServletPostProcessor`

BeanFactoryPostProcessor:

* `AspectJWeavingEnabler`,
* `ConfigurationClassPostProcessor`,
* `CustomAutowireConfigurer`,
* `CustomEditorConfigurer`,
* `CustomScopeConfigurer`,
* `DeprecatedBeanWarner`,
* `PlaceholderConfigurerSupport`,
* `PreferencesPlaceholderConfigurer`,
* `PropertyOverrideConfigurer`,
* `PropertyPlaceholderConfigurer`,
* `PropertyResourceConfigurer`,
* `PropertySourcesPlaceholderConfigurer`,
* `ServletContextPropertyPlaceholderConfigurer`

## Placeholders
See: [System properties vs Environment variables](/wiki/java-standard-edition/#system-properties-vs-environment-variables)

You use the ```PropertyPlaceholderConfigurer``` to externalize property values. Properties might come from Environment Variables, external file, database or even remote resource like REST payload.

By default ```PropertyPlaceholderConfigurer``` reads properties in the following order: ```System Properties -> Environment Variables -> locations```

**Configuration** :

XML:

```xml
<bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
    <property name="locations" value="classpath:config.properties"/>
</bean>
```

Java:

```java
@Configuration
@PropertySource(value = "classpath:config.properties", name = "locations")
public class AppConfig {

...

    @Bean
    public static PropertySourcesPlaceholderConfigurer properties() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
```

Properties source file `config.properties` :

```
datasourcePassword=myPassword
accountFrom1=12345
accountTo1=54321
amount1=100
```

**Usage** :

Using it in XML configuration:

```xml
<bean id="payment1" class="com.github.kospiotr.spring.Payment">
    <property name="accountFrom" value="${accountFrom1}"/>
    <property name="accountTo" value="${accountTo1}"/>
    <property name="amount" value="${amount1}"/>
</bean>
```

Injecting it into component:

```java
@Component
public class SomeDAO {

	@Value("${datasourcePassword}")
	private String password;
	
	...
	
}
```

Obtaining properties via the Environment APIs:

```java
@Autowired
private Environment env;
...
dataSource.setPassword(env.getProperty("datasourcePassword"));
```

# Testing

* Annotation `@RunWith(SpringJUnit4ClassRunner.class)` makes test class as a manageable component. It allows to inject components.

* `@ContextConfiguration` allows to load existing configuration(XML, JavaConfig)

Maven dependency:

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>4.0.3.RELEASE</version>
    <scope>test</scope>
</dependency>
```

Integration test:

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"/spring-configuration.xml"})
public class BillingServiceTest {

    @Inject
    BillingService billingService;

    @Test
    public void shouldNotProcessPaymentWithNegativeAmount() {
        Payment payment = new Payment("Test", "123", "321", -10);

        boolean result = billingService.processPayment(payment);

        assertFalse(result);
    }

    @Test
    public void shouldNotProcessPaymentWithoutDescription() {
        Payment payment = new Payment(null, "123", "321", 10);

        boolean result = billingService.processPayment(payment);

        assertFalse(result);
    }
}
```

# Best practices

* **Dependencies** - If you’re starting a new project today, I highly recommend using [Spring Boot’s parent POM](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-dependency-management) or the [Spring Platform](https://spring.io/platform). Both provide a curated set of dependencies that are known to work well together.
* **Injection** - Always use constructor based dependency injection in your beans. Always use assertions for mandatory dependencies. For more background on why field based injection is evil, you can read this article by Oliver Gierke [http://olivergierke.de/2013/11/why-field-injection-is-evil/](http://olivergierke.de/2013/11/why-field-injection-is-evil/).
* **Independent components from the framework** - don't be so prescriptive. I think it’s fine to have dependencies on framework classes and annotations, but I don’t want to rewrite more than 20% of the class if I were to move off Spring. You can always use JSR-330 annotations if needed. How often do you switch architecture?
* **Configuration** - depends on your needs but use autowiring, component scanning. I personally prefer Java configuration since Spring Boot appeared
* **Interface programming** - if no multiple implementations in mind then avoid creating interfaces. CGLIb does great job in the runtime for non interfaced beans and mocking/spying/stubbing is very easy with Mockito framework.
* **Layering** - keep layered project structure: domains, services, DAOs, views, controllers
* **Logging** - Use SLF4J in your code to log things. Stick with Spring Boot’s default choice of logback if possible. Log to the console only and use a tool such as Splunk to capture and store.
* **Unit Testing** - keep Spring out from unit testing. Use jUnit, Mockito, festAssert, Spock.
* **Integration Testing** - use mocked services as much as possible in order to prevent slow parts of the applications. In-memory database, web server should be the last
* **Properties** - never ship application with environmental properties build in. Properties like datasource, JMS urls or credentials should be delivered by the environmental properties or by the externalized properties files. Only shared properties should be embedded. Profiles and property switch are also bad pattern.
* **Component granularity** - don't overuse Spring components. Use it only for binding application components, for example Form and it's input components.
* **Use best practices and conventions** - use Spring Boot if possible ;-)


# References
* [Spring Framework](https://projects.spring.io/spring-framework/)
* [Spring.io](https://spring.io/)
* [Javabrains (Koushik)](https://javabrains.io/topics/spring)
* [Mykyong](https://www.mkyong.com/)
* [Guice](https://github.com/google/guice)

Further 
* [Spring Workshops](http://kospiotr.github.io/spring-workshops/)