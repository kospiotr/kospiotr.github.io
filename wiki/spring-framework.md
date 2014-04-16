---
layout: wiki
title: Spring Framework
comments: false
gallery: true
toc: true
editurl: wiki/spring-framework.md
res: ../resources/wiki/spring
---

#Introduction
##History
###Java Enterprise Edition
Before Spring Framework Enterprise applications has been developed using JavaEE (EJB2). Some major drawbacks:

 * very complicated
 * unclear workflow
 * many XML files with configuration
 * environment polluted logic (had to extends abstract classes, implement JavaEE interfaces)
 * hard to write unit tests
 * very weak Time To Market
 * requires Application Server - special container where Enterprise applications can be deployed
  * different servers (open, commercial)
  * they differently implement specification

<center>
![JEE]({{page.res}}/ejb-development.png)
</center>

###The book
Rod Johnson between 1997 and 2002 was dealing with J2EE applications as a consultant. He identified many problems during his carrere and described them in his book "Expert One-on-One J2EE Design and Development".

<center>
![Expert One-on-One J2EE Design and Development](http://ecx.images-amazon.com/images/I/51D67wYiL8L._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg)

"Expert One-on-One J2EE Design and Development" - Rod Johnson, Jurgen Hoeller (2002)
</center>

He published there analysys of the problems with the code that implements framework *Interface21* which was demonstrating how to solve those problems. This framework we would call today injection container.

###Versions

<center>
![Spring Logo](http://upload.wikimedia.org/wikipedia/de/9/9d/Spring_Logo.png)
</center>

 * Spring 1.0 – 2004
 * Spring 2.0 – 2006
 * Spring 2.5 – 2007
 * Spring 3.0 – 2009
 * Spring 3.1 - 2011
 * Spring 3.2 - 2013
 * Spring 4.0 - 2013

Very stable and frequent release plan.

##Mission

* The main aim is to **simplifying application development**.
* Spring support application development on all levels / layers
* There are many modules and extensions with other popular frameworks eg.
 * Struts, JSF, WebWork
 * Hibernate, TopLink, JPA
 * JDBC, JTA
* Spring doesn't competete with other solutions and technologies which are good. Instead of that it supports theirs integration.
* Spring doesn't forces to be installed on the application server, it doesn't forces speciality API to be used.
* Spring is easy to be used
* Spring enhances developers productivity
* Spring supports in writing high quality software
* Spring supports in writing testable code

##Construction
Spring is made of the following modules:

<center>
![Sprin Components](http://docs.spring.io/spring/docs/4.0.3.RELEASE/spring-framework-reference/htmlsingle/images/spring-overview.png)
</center>

[http://docs.spring.io/spring/docs/4.0.3.RELEASE/spring-framework-reference/htmlsingle/#overview-modules](http://docs.spring.io/spring/docs/4.0.3.RELEASE/spring-framework-reference/htmlsingle/#overview-modules)

#Inversion of Control container
Central to the Spring Framework is its Inversion of Control (IoC) container, which provides a consistent means of configuring and managing Java objects using **reflection**. The container is responsible for managing object lifecycles of specific objects:

 * creating these objects,
 * configuring these objects by wiring them together,
 * calling their initialization methods.

##Purpose
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

<center>![Huge dependency graph]({{page.res}}/sample-dependency-graph.png)</center>

##Bean Factory
Bean Factory is a core element of the Spring Inversion of Control container that creates requested objects and resolves dependencies by the given configuration:

<center>![Huge dependency graph]({{page.res}}/bean-factory.png)</center>

 * Application `App.java`:

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

 * Configuration file `spring-configuration.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.hellospring.BillingService"/>

</beans>
```

The Bean Factory creates objects (Factory pattern) and if the object require dependency it searches them in the registry (Lookup pattern) and inject them to the object (Dependency Injection pattern).

If the dependency is not yet created, the whole above process applies to the child (recursive lookup):

<center>![Bean Factory]({{page.res}}/bean-factory-with-dependencies.png)</center>

Objects can be obtained by means of either dependency lookup or dependency injection.

* **Dependency lookup** is a pattern where a caller asks the container object for an object with a specific name or of a specific type.

* **Dependency injection** is a pattern where the container passes objects by name to other objects, via either constructors, properties, or factory methods.

##ApplicationContext

`ApplicationContext` extends `BeanFactory` and adds some extra features to it.

* **Bean Factory**
 * *Bean instantiation/wiring*

* **Application Context**
 * *Bean instantiation/wiring*
 * Automatic BeanPostProcessor registration
 * Automatic BeanFactoryPostProcessor registration
 * Convenient MessageSource access (for i18n)
 * ApplicationEvent publication

<center>![ApplicationContext]({{page.res}}/application-context.png)</center>

Then initialisation and configuration changes (simplifies), as ApplicationContext is being used more widely:

```java
    public static void main(String[] args) {
        //create Inversion of Control container
        //create configuration and populate Inversion of Control container with it
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration.xml");

        //requesting bean from the container by the id
        BillingService billingService = applicationContext.getBean("ruleBillingService", BillingService.class);
        billingService.charge(100);
    }
```

##Configuration
The container can be configured by loading XML files or detecting specific Java annotations on configuration classes. These data sources contain the bean definitions which provide the information required to create the beans.

* XML way:

 Configuratino file `spring-configuration.xml`:

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
 ApplicationContext applicationContext = new ClassPathXmlApplicationContext("main.xml","common.xml","rest.xml");
 ```
* Java way:

 Configuratino file `AppConfig.java`:

  ```java
  @Configuration
  public class AppConfig {

      @Bean(name = "ruleBillingService")
      public BillingService billingServiceBean() {
          return new BillingService();
      }

  }
  ```

 ApplicationContext initialization `App.java`:

 ```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);

 ```

##Beans
Objects created by the container (`BeanFactory` or `ApplicationContext`) are also called managed objects or beans. Only managed objects can be controlled by Spring (injecting dependencies, lifecycle management).

<center>![Bans vs Object instances]({{page.res}}/beans.png)</center>


#XML-based container configuration
##Object management
###Bean declaration
Simple bean declaration:

```xml
<bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"/>
```

* Obtain bean by id:

 ```java
BillingService billingService = applicationContext.getBean("test", BillingService.class);
```

* Obtaining bean by type (if unique bean class is definied in configuration):

 ```java
BillingService billingService = applicationContext.getBean(BillingService.class);
```

If multiple beans with given class declared:

```xml
    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"/>
    <bean id="ruleBillingService2" class="com.github.kospiotr.spring.BillingService"/>
```

They can be lookup from container as a map where bean id is a map key:

```java
Map<String, BillingService> billingService = applicationContext.getBeansOfType(BillingService.class);
```


###Bean alias
The bean can have more ids thanks to aliases

```xml
    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService"/>
    <alias name="ruleBillingService" alias="service"/>
```

Obtain bean by alias is achieved in a same way as by id:

 ```java
BillingService service = applicationContext.getBean("service", BillingService.class);

```
##Factory method
Objects can be manually created by other bean via factory method:

###Static Factory method

```xml
<bean id="ruleBillingService"
	class="com.github.kospiotr.spring.BillingServiceStaticFactory" 
	factory-method="createBillingService"/>
```

###Non static Factory method

```xml
<bean id="ruleBillingServiceFactory"
	class="com.github.kospiotr.spring.BillingServiceFactory"/>
<bean id="ruleBillingService"
	factory-bean="ruleBillingServiceFactory" 
	factory-method="createBillingService"/>
```

##Scopes
Basic scopes:

 * **singleton** - (default) scopes a single bean definition to a single object instance per Spring IoC container.
 * **prototype** - scopes a single bean definition to any number of object instances.

Only valid in the context of a web-aware Spring ApplicationContext:

 * **request** - scopes a single bean definition to the lifecycle of a single HTTP request; that is each and every HTTP request will have its own instance of a bean created off the back of a single bean definition.
 * **session** - scopes a single bean definition to the lifecycle of a HTTP Session.
 * **global** - session Scopes a single bean definition to the lifecycle of a global HTTP Session. Typically only valid when used in a portlet context.

Examples:

Given `BillingService.java`:

```java
public class BillingService {

    public BillingService() {
        System.out.println("Constructed BillingService");
    }

}
```

* Singleton example:

 Configuration:

 ```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService" scope="singleton"/>
</beans>
 ```

 Application:

 ```java
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration-singleton.xml");

        BillingService service1 = applicationContext.getBean(BillingService.class);
        BillingService service2 = applicationContext.getBean(BillingService.class);
        BillingService service3 = applicationContext.getBean(BillingService.class);
 ```

 Result:

 ```
> Constructed BillingService
 ```
* Prototype example:

 Configuration:

 ```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="ruleBillingService" class="com.github.kospiotr.spring.BillingService" scope="prototype"/>
</beans>
 ```

 Application:

 ```java
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration-singleton.xml");

        BillingService service1 = applicationContext.getBean(BillingService.class);
        BillingService service2 = applicationContext.getBean(BillingService.class);
        BillingService service3 = applicationContext.getBean(BillingService.class);
 ```

 Result:

 ```
> Constructed BillingService
> Constructed BillingService
> Constructed BillingService
 ```

##Lifecycle
Spring helps to mange the lifecycle of the objects. It is possible to perform actions:

* after object has been initialized (after all properties has been set up),
* before it will be destroyed (when context goes down).

There are 3 methods how it can be achieved by Spring:

* In the configuration
* By implementing interfaces
* By marking methods with annotations

Examples:

* **Configuration driven**

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

 Application:

 ```java
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration-configuration-driven-lifecycle.xml");

        BillingService service1 = applicationContext.getBean(BillingService.class);

        ((ConfigurableApplicationContext) applicationContext).close(); //forces context to shut down
 ```

 Result:

 ```
> Constructed BillingService
> BillingService initialized
> BillingService clean up
 ```

* **Interface driven**

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
        System.out.println("BillingService destroyed");
    }
}
 ```

 Application:

 ```java
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration-interface-driven-lifecycle.xml");

        BillingServiceLifecycleAware service1 = applicationContext.getBean(BillingServiceLifecycleAware.class);

        ((ConfigurableApplicationContext) applicationContext).close(); //forces context to shut down
 ```

 Result:

 ```
> Constructed BillingService
> BillingService initialized
> BillingService destroyed
 ```

> The most recommended way is using plain configuration, then JSR-330 annotations, and in the end implementing interfaces. Interfaces will tight coupled your code to Spring and annotations bind the code with JSR-330. JSR-330 is pretty common now and this is straightforward convention to configure lifecycle in the application. For libraries development I would suggest using plain configuration.



##Dependency Injection

###Object initialisation
####Value

 * Simple values:

```xml
        <property name="sampleString" value="TestingString"/>
        <property name="sampleIntiger" value="100"/>
        <property name="sampleDouble" value="99.99"/>
```

 * List:

 ```xml
         <property name="sampleList">
             <list>
                 <value>pechorin@hero.org</value>
                 <value>raskolnikov@slums.org</value>
                 <value>stavrogin@gov.org</value>
                 <value>porfiry@gov.org</value>
             </list>
         </property>
 ```

 * Set:

 ```xml
         <property name="sampleSet">
             <set>
                 <value>pechorin@hero.org</value>
                 <value>raskolnikov@slums.org</value>
                 <value>stavrogin@gov.org</value>
                 <value>porfiry@gov.org</value>
             </set>
         </property>
 ```

 * Map:

 ```xml
         <property name="sampleMap">
             <map>
                 <entry key="pechorin" value="pechorin@hero.org"/>
                 <entry key="raskolnikov" value="raskolnikov@slums.org"/>
                 <entry key="stavrogin" value="stavrogin@gov.org"/>
                 <entry key="porfiry" value="porfiry@gov.org"/>
             </map>
         </property>
 ```

####Inner bean

```xml
    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService">
        <property name="creditCardProcessor">
            <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
        </property>
        <property name="transactionLogger">
            <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
        </property>
    </bean>
```

####By reference

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService">
        <property name="creditCardProcessor" ref="creditCardProcessor"/>
        <property name="transactionLogger" ref="transactionLogger"/>
    </bean>
```

###Injecting methods

To get know what Dependency Injection is please refer to this wiki: [Dependecy Injection](dependency-injection.html)

####Setter based dependency injection

Setter-based DI is accomplished by the container calling setter methods on your beans after invoking a no-argument constructor or no-argument static factory method to instantiate your bean.

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
    <bean id="billingService" class="com.github.kospiotr.spring.BillingService">
        <property name="creditCardProcessor" ref="creditCardProcessor"/>
        <property name="transactionLogger" ref="transactionLogger"/>
    </bean>
```

####Constructor based dependency injection

Constructor-based DI is accomplished when the container invokes a class constructor with a number of arguments, each representing a dependency on other class.

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
    <bean id="billingService" class="com.github.kospiotr.spring.BillingService">
        <constructor-arg name="creditCardProcessor" ref="creditCardProcessor"/>
        <constructor-arg name="transactionLogger" ref="transactionLogger"/>
    </bean>
```

###Autowiring

Given application:

```java
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration-autowire-by-type.xml");

        Payment payment = new Payment("Pizza payment", "123", "321", 20);

        //requesting bean from the container by the id
        BillingService billingService1 = applicationContext.getBean("billingService1", BillingService.class);
        billingService1.processPayment(payment);
```

####no autowiring - manual wiring

 This is default setting which means no autowiring and you should use explicit bean reference for wiring. You have nothing to do special for this wiring. This is what you already have seen in Dependency Injection chapter.

Configuration:

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService">
        <property name="creditCardProcessor" ref="creditCardProcessor"/>
        <property name="transactionLogger" ref="transactionLogger"/>
    </bean>
```

Result:

```
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
> Constructed BillingService, and injected CreditCardProcessor and TransactionLogger
```

####byName

 Autowiring by property name. Spring container looks at the properties of the beans on which autowire attribute is set to byName in the XML configuration file. It then tries to match and wire its properties with the beans defined by the same names in the configuration file.

Configuration:

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService" autowire="byName"/>
```

Result:

```
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
```

####byType

 Autowiring by property datatype. Spring container looks at the properties of the beans on which autowire attribute is set to byType in the XML configuration file. It then tries to match and wire a property if its type matches with exactly one of the beans name in configuration file. If more than one such beans exists, a fatal exception is thrown.

Configuration:

```xml
    <bean id="cp" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="tl" class="com.github.kospiotr.spring.TransactionLogger"/>

    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService" autowire="byType"/>
```

Result:

```
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
```

####constructor

 Similar to byType, but type applies to constructor arguments. If there is not exactly one bean of the constructor argument type in the container, a fatal error is raised.

Configuration:

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService" autowire="constructor"/>
```

Result:

```
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService, and injected CreditCardProcessor and TransactionLogger
```

##Container Extension Points

###BeanPostProcessor
The `BeanPostProcessor` interface defines callback methods that you can implement to provide your own (or override the container’s default) instantiation logic, dependency-resolution logic, and so forth. If you want to implement some custom logic after the Spring container finishes instantiating, configuring, and initializing a bean, you can plug in one or more `BeanPostProcessor` implementations.

Definition of custom `BeanPostProcessor`:

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

    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService">
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
> before bean init = billingService1
> after bean init = billingService1
```

###BeanPostProcessorFactory
The next extension point that we will look at is the `org.springframework.beans.factory.config.BeanFactoryPostProcessor`. The semantics of this interface are similar to those of the `BeanPostProcessor`, with one major difference: `BeanFactoryPostProcessor` operates on the bean configuration metadata; that is, the Spring IoC container allows a `BeanFactoryPostProcessor` to read the configuration metadata and potentially change it before the container instantiates any beans other than `BeanFactoryPostProcessors`.


Definition of custom `BeanFactoryPostProcessor`:

```java
public class SimpleBeanFactoryPostProcessor implements BeanFactoryPostProcessor {

    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        System.out.println("PostProcess: " + Arrays.toString(beanFactory.getBeanDefinitionNames()));
    }

}
```

Registration:

```xml
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>

    <bean id="billingService1" class="com.github.kospiotr.spring.BillingService">
        <property name="creditCardProcessor" ref="creditCardProcessor"/>
        <property name="transactionLogger" ref="transactionLogger"/>
    </bean>

    <bean class="com.github.kospiotr.spring.SimpleBeanFactoryPostProcessor"/>
```

Result:

```
> PostProcess: [creditCardProcessor, transactionLogger, billingService1, com.github.kospiotr.spring.S impleBeanFactoryPostProcessor#0]
> Constructed CreditCardProcessor
> Constructed TransactionLogger
> Constructed BillingService
> Injected CreditCardProcessor to BillingService
> Injected TransactionLogger to BillingService
```
###Sample implementations

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

####Placeholders
You use the PropertyPlaceholderConfigurer to externalize property values from a bean definition in a separate file using the standard Java Properties format. Doing so enables the person deploying an application to customize environment-specific properties such as database URLs and passwords, without the complexity or risk of modifying the main XML definition file or files for the container.

Configuration:

```xml
    <bean id="payment1" class="com.github.kospiotr.spring.Payment">
        <property name="paymentTitle" value="${paymentTitle1}"/>
        <property name="accountFrom" value="${accountFrom1}"/>
        <property name="accountTo" value="${accountTo1}"/>
        <property name="amount" value="${amount1}"/>
    </bean>
    <bean id="payment2" class="com.github.kospiotr.spring.Payment">
        <property name="paymentTitle" value="${paymentTitle1}"/>
        <property name="accountFrom" value="${accountFrom1}"/>
        <property name="accountTo" value="${accountTo1}"/>
        <property name="amount" value="${amount1}"/>
    </bean>

    <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="locations" value="classpath:config.properties"/>
    </bean>
```

Properties file `config.properties`:

```
paymentTitle1=Pizza Payment
accountFrom1=12345
accountTo1=54321
amount1=100
paymentTitle2=Shoppings
accountFrom2=98765
accountTo2=56789
amount2=200
```

Application:

```java
Payment payment1 = applicationContext.getBean("payment1", Payment.class);
System.out.println("payment1 = " + payment1);
Payment payment2 = applicationContext.getBean("payment2", Payment.class);
System.out.println("payment2 = " + payment2);
```

Result:

```
payment1 = Payment{paymentTitle=Pizza Payment, accountFrom=12345, accountTo=54321, amount=100.0}
payment2 = Payment{paymentTitle=Pizza Payment, accountFrom=12345, accountTo=54321, amount=100.0}
```

#Annotation-based container configuration
An alternative to XML setups is provided by annotation-based configuration which rely on the bytecode metadata for wiring up components instead of angle-bracket declarations. Instead of using XML to describe a bean wiring, the developer moves the configuration into the component class itself by using annotations on the relevant class, method, or field declaration.

To be able to use annotations you need to add to the configuration following directive:

```xml
<context:annotation-config/>
```

##Dependency Injection

Spring has mechanism for automated wiring objects called autowiring. It reduces need of explicit wiring and boilerplate code.

Components might be tied by following annotations: `@Autowired`, `@Resource`, `@Inject`. Great detailed explination what is the difference can be found in [the article](http://blogs.sourceallies.com/2011/08/spring-injection-with-resource-and-autowired).


Configuration doesn't contains information about component wiring:

```xml
    <context:annotation-config/>

    <bean id="billingService" class="com.github.kospiotr.spring.BillingServiceAutowireConstructor"/>
    <bean id="creditCardProcessor" class="com.github.kospiotr.spring.CreditCardProcessor"/>
    <bean id="transactionLogger" class="com.github.kospiotr.spring.TransactionLogger"/>
```

###@Inject and @Autowired

1. Matches by Type
2. Restricts by Qualifiers (@Named or custom Qualifier annotation)
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

**@Inject vs @Autowired**
> @Inject is part of the Java CDI standard introduced in Java EE 6 (JSR-299), read more. Spring has chosen to support using @Inject synonymously with their own @Autowired annotation.

> @Autowired is Spring's own (legacy) annotation. @Inject is part of a new Java technology called CDI that defines a standard for dependency injection similar to Spring. In a Spring application, the two annotations works the same way as Spring has decided to support some JSR-299 annotations in addition to their own.

> Inect guarantee code portability between different Dependency Injectionframeworks ike Spring, Guice, CDI.

Source: [http://stackoverflow.com/questions/7142622/what-is-the-difference-between-inject-and-autowired-in-spring-framework-which](http://stackoverflow.com/questions/7142622/what-is-the-difference-between-inject-and-autowired-in-spring-framework-which)

###@Resource

1. Matches by property Name
2. Matches by Type
3. Restricts by Qualifiers (ignored if match is found by name)

Behaves similary to @Autowired and @Inject apart that it ties components first by name then by type.

@Resource optionally takes a name attribute, and by default Spring interprets that value as the bean name to be injected. In other words, it follows by-name semantics.

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
BillingServiceResourceNamed billingService1 = applicationContext.getBean("billingService", BillingServiceResourceNamed.class);
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

###Qualifiers

When using `@Inject` or `@Autowire` annotations and wiring by type or by name is not possible `@Named` or `@Qualifier` might be used:

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
    @Named("creditCardProcessor1")
    public void setCreditCardProcessor(CreditCardProcessor creditCardProcessor) {
        System.out.println("Injected CreditCardProcessor to BillingService");
        this.creditCardProcessor = creditCardProcessor;
    }

    @Inject
    @Named("transactionLogger1")
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

##Lifecycle

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
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-configuration-annotation-driven-lifecycle.xml");
BillingServiceJsr330LifecycleAware service1 = applicationContext.getBean(BillingServiceJsr330LifecycleAware.class);
((ConfigurableApplicationContext) applicationContext).close(); //forces context to shut down
```

Result:

```
> Constructed BillingService
> BillingService initialized
> BillingService destroyed

```

##Component scanning

This section describes an option for implicitly detecting the candidate components by scanning the classpath. Candidate components are classes that match against a filter criteria and have a corresponding bean definition registered with the container. This removes the need to use XML to perform bean registration, instead you can use annotations (for example @Component).

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

* `@Service` - Annotate all your service classes with `@Service`. All your business logic will be in Service classes.
* `@Repository` - Annotate all your DAO classes with `@Repository`. All your database access logic should be in DAO classes.
* `@Component` - Annotate your other components (for example REST resource classes) with component stereotype.
* `@Named` - Standarized `@Component` annotation.

> `@Component` is a generic stereotype for any Spring-managed component. `@Repository`, `@Service`, and `@Controller` are specializations of `@Component` for more specific use cases, for example, in the persistence, service, and presentation layers, respectively.
Reasons to use them :

> The main advantage of using `@Repository` or `@Service` over `@Component` is that it's easy to write an AOP pointcut that targets, for instance, all classes annotated with `@Repository`.
> You don't have to write bean definitions in context xml file. Instead annotate classes and use those by autowiring.
> Specialized annotations help to clearly demarcate application layers (in a standard 3 tiers application).

#Testing

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

#References
* Spring documentation
* Koushik
* Mykyong
* Guice
