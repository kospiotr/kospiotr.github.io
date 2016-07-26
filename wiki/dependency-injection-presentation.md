---
layout: wiki
title: Dependency Injection (Presentation)
comments: false
toc: true
editurl: wiki/dependency-injection-presentation.md
res: ../../resources/wiki/dependency-injection
slideshow: true
---

# Motivation - how to write good code?

* Clean code
* Object Oriented
* High cohesion
* DRY - dont't repeat yourself (code reuse)
* SoC - separation of concerns
* **SOLID** principles
    * **S** (SRP) - Single responsibility principle
    * **O** (OCP) - Open/closed principle
    * **L** (LSP) - Liskov substitution principle
    * **I** (ISP) - Interface segregation principle
    * **D** (DIP) - **Dependency inversion principle**

See: [Clean Code presentation]({{ site.baseurl }}/wiki/clean-code-presentation)

# What is dependency?
Wa are talking about dependency when one object relates on another one.

{:.text-center}
![Dependency]({{ page.res }}/dependency.png)

Code example:

```java
public class A{

	private B objB;

	public A() {
		this.objB = new B();
	}

}
```

From real life example Web Action may need Data Access Object (DAO) to retrieve or save data to Data Base. Data Base actions is hidden in the DAO object (encapsulated).

{:.text-center}
![Dependency example]({{ page.res }}/dependency-example.png)

Example implementation of Web Action:

```java
public class DisplayActiveUsersWebAction{

	protected UsersDAO usersDAO = new UsersDAO();

}
```

Above Web Action object instantiates dependant ```UsersDao``` object itself, which means that it satisfies its own dependency. In other words it configures itself.

# What's wrong with direct constructor calls - Inversion of Control motivation

```java
public interface BillingService {
  Receipt chargeOrder(PizzaOrder order, CreditCard creditCard);
}
```

```java
public class RealBillingService implements BillingService {

  public Receipt chargeOrder(PizzaOrder order, CreditCard creditCard) {

    CreditCardProcessor creditCardProcessor = new PaypalCreditCardProcessor();
    TransactionLog transactionLog = new DatabaseTransactionLog();

    ChargeResult result = creditCardProcessor.charge(creditCard, order.getAmount());
    transactionLog.logChargeResult(result);
    ...
  }
}
```
This code poses problems for modularity and testability. In fact this code is not testable because of the following reasons:

* If ```PaypalCreditCardProcessr``` or ```DatabaseTransactionLog``` has any dependencies like ```DatabaseConnection``` or ```RemoteTransactionArchiverWebService``` they will create them as well.
* If we would like to test ```RealBillingService``` with unit tests the ```PaypalCreditCardProcessor``` will be created and we would perform operations on the real card creditCardProcessor. It means that we will the code will charge a real credit card during testing! In the tests we should operate on a ```FakeCreditCardProcessor```!
* When using other providers like ```VisaCreditCardProcessor``` for ```CreditCardProcessor``` or ```BitCoinTransactionLog``` for ```TransactionLog``` will require code changes in the ```RealBillingService```.
* It's also awkward to test what happens when the charge is declined or when the service is unavailable.
* This method often leads to Spaghetti Monster code.

# Inversion of control principle
The problem with above example is that those dependencies are created directly by the ```RealBillingService```. Instead the ready to use objects should be prepared externally and be delivered to the object that operates on them. 

This object delivery from external place is called ***Inversion of Control*** as control over the object creation has been inverted.

**IoC** is sometimes facetiously referred to as the:

<blockquote> "Hollywood Principle: Don't call us, we'll call you".</blockquote>


# Inversion of control implementations

 * Factory pattern
 * Service locator pattern
 * **Dependency injection**
     * A constructor injection
     * Parameter injection
     * A setter injection
     * An interface injection
 * Contextualized lookup
 * Template method design pattern
 * Strategy design pattern

## Factories
A simple factory uses static methods to obtain implementation of the given class:

```java
public class RealBillingService implements BillingService {

  public Receipt chargeOrder(PizzaOrder order, CreditCard creditCard) {

    CreditCardProcessor creditCardProcessor = CreditCardProcessorFactory.getInstance();
    TransactionLog transactionLog = TransactionLogFactory.getInstance();

      ChargeResult result = creditCardProcessor.charge(creditCard, order.getAmount());
      transactionLog.logChargeResult(result);

      ...
  }
}
```

Then the ```CreditCardProcessorFactory``` might look like that:

```java

public class CreditCardProcessorFactory {

  private static CreditCardProcessor instance;

  public static void setInstance(CreditCardProcessor creditCardProcessor) {
    instance = creditCardProcessor;
  }

  public static CreditCardProcessor getInstance() {
    if (instance == null) {
      return new SquareCreditCardProcessor();
    }

    return instance;
  }
}
```

The factory makes it possible to write a unit test:

```java
public class RealBillingServiceTest extends TestCase {

  private final PizzaOrder order = new PizzaOrder(100);
  private final CreditCard creditCard = new CreditCard("1234", 11, 2010);

  private final InMemoryTransactionLog transactionLog = new InMemoryTransactionLog();
  private final FakeCreditCardProcessor creditCardProcessor = new FakeCreditCardProcessor();

  @Override public void setUp() {
    TransactionLogFactory.setInstance(transactionLog);
    CreditCardProcessorFactory.setInstance(creditCardProcessor);
  }

  public void testSuccessfulCharge() {
    RealBillingService billingService = new RealBillingService();
    Receipt receipt = billingService.chargeOrder(order, creditCard);

    assertTrue(receipt.hasSuccessfulCharge());
    assertEquals(100, receipt.getAmountOfCharge());
    assertEquals(creditCard, creditCardProcessor.getCardOfOnlyCharge());
    assertEquals(100, creditCardProcessor.getAmountOfOnlyCharge());
    assertTrue(transactionLog.wasSuccessLogged());
  }

  @Override public void tearDown() {
    TransactionLogFactory.setInstance(null);
    CreditCardProcessorFactory.setInstance(null);
  }
}
```

This code is clumsy as:

* A global variable holds the mock implementation
    * need to be careful about setting it up and tearing it down.
    * could cause problems for other tests if initialization fails
    * prevents from running multiple tests in parallel.
* All the static member variables are kept on the special area on heap memory - Permanent Generation which can cause some memory and Garbage Collector issues.
* The dependencies are hidden in the code.
    * If we add a dependency on a ```CreditCardFraudTracker```, we have to re-run the tests to find out which ones will break.
    * If forget to initialize a factory for a production service, we don't find out until a charge is attempted.
* As the application grows, babysitting factories becomes a growing drain on productivity.

Quality problems will be caught by QA or acceptance tests. That may be sufficient, but we can certainly do better.

## Dependency Injection
The core principal is to separate behavior from dependency resolution.

In the example, the ```RealBillingService``` is not responsible for looking up the ```TransactionLog``` and ```CreditCardProcessor```.

Instead, they're passed via **constructor** or **setter**.

### Constructor Injection

Implementation:

```java
public class RealBillingService implements BillingService {
  private final CreditCardProcessor creditCardProcessor;
  private final TransactionLog transactionLog;

  public RealBillingService(CreditCardProcessor creditCardProcessor,
      TransactionLog transactionLog) {
    this.creditCardProcessor = creditCardProcessor;
    this.transactionLog = transactionLog;
  }

  public Receipt chargeOrder(PizzaOrder order, CreditCard creditCard) {
    ChargeResult result = creditCardProcessor.charge(creditCard, order.getAmount());
    transactionLog.logChargeResult(result);
    ...
  }
}
```

Test:

```java
public class RealBillingServiceTest extends TestCase {

  private final PizzaOrder order = new PizzaOrder(100);
  private final CreditCard creditCard = new CreditCard("1234", 11, 2010);

  private final InMemoryTransactionLog transactionLog = new InMemoryTransactionLog();
  private final FakeCreditCardProcessor creditCardProcessor = new FakeCreditCardProcessor();

  public void testSuccessfulCharge() {
    RealBillingService billingService = new RealBillingService(creditCardProcessor, transactionLog);
    Receipt receipt = billingService.chargeOrder(order, creditCard);

    assertTrue(receipt.hasSuccessfulCharge());
    assertEquals(100, receipt.getAmountOfCharge());
    assertEquals(creditCard, creditCardProcessor.getCardOfOnlyCharge());
    assertEquals(100, creditCardProcessor.getAmountOfOnlyCharge());
    assertTrue(transactionLog.wasSuccessLogged());
  }
}
```

We don't need any factories, and we can simplify the testcase by removing the ```setUp``` and ```tearDown``` boilerplate.

### Setter injection

Implementation:

```java
public class RealBillingService implements BillingService {
  private final CreditCardProcessor creditCardProcessor;
  private final TransactionLog transactionLog;

  public void setCreditCardProcessor(CreditCardProcessor creditCardProcessor){
	this.creditCardProcessor = creditCardProcessor;
  }

  public void setCreditCardProcessor(TransactionLog transactionLog){
	this.transactionLog = transactionLog;
  }

  public Receipt chargeOrder(PizzaOrder order, CreditCard creditCard) {
    ChargeResult result = creditCardProcessor.charge(creditCard, order.getAmount());
    transactionLog.logChargeResult(result);
    ...
  }
}
```

Test:

```java
public class RealBillingServiceTest extends TestCase {

  private final PizzaOrder order = new PizzaOrder(100);
  private final CreditCard creditCard = new CreditCard("1234", 11, 2010);

  private final InMemoryTransactionLog transactionLog = new InMemoryTransactionLog();
  private final FakeCreditCardProcessor creditCardProcessor = new FakeCreditCardProcessor();

  public void testSuccessfulCharge() {
    RealBillingService billingService = new RealBillingService();
    billingService.setTransactionLog(transactionLog);
    billingService.setCreditCardProcessor(creditCardProcessor);
    Receipt receipt = billingService.chargeOrder(order, creditCard);

    assertTrue(receipt.hasSuccessfulCharge());
    assertEquals(100, receipt.getAmountOfCharge());
    assertEquals(creditCard, creditCardProcessor.getCardOfOnlyCharge());
    assertEquals(100, creditCardProcessor.getAmountOfOnlyCharge());
    assertTrue(transactionLog.wasSuccessLogged());
  }
}
```


# Application configuration

Dependency Injection design pattern requires that all child dependencies must be resolved / instantiated before injection to the object. In the `RealBillingService` example recursive injection

```
+RealBillingService (BillingService)
     |    |
     |    +PaypalCreditCardProcessor (CreditCardProcessor)
     |        |
	 |        +PaypalWebService
	 |
     +DatabaseTransactionLog (TransactionLog)
	      |
		  +DatabaseAccess
```

When dependencies graph is getting bigger it is worth to use some kind of framework to manage its dependencies configuration.

# Profits - Maintainability

Code now:

* Is much more readable
* Is much better fragmented and decoupled
* Is much more cohesive
* Is much better encapsulated
* Has better responsibility, is reusable
* Is better testable
* Has explicit dependencies
* Can be easier documented

Are you convinced?

# Real life

Many folks don't realize that your dependencies chain can become nested, and it quickly
becomes unwieldy to wire them up manually. Even with factories, the duplication of your code
is just not worth it.

The most valuable benefit of using an IoC container is that you can have a configuration switch
in one place which lets you change between, say, test mode and production mode.

Centralize the configuration of your dependencies.

Polymorphism for plugability: with DI you can inject dependency into the code without explicitly knowing how the
functionality is actually working. For example: your class might get a ```ILog``` interface injected
so that it can write logs. Since the class works with the ```ILog``` interface, it would be possible to
implement a ```FileLog```, ```MemoryLog``` or a ```DatabaseLog``` & inject this into your class. Any of these
implementation will work fine as long as they implement the ```ILog``` interface

# DI Frameworks

 * [Spring Framework](http://projects.spring.io/spring-framework/)
 * [Guice](https://code.google.com/p/google-guice/)
 * [Pico Container](http://picocontainer.codehaus.org/)
 * [Weld](http://weld.cdi-spec.org/)
 * [AngularJS](https://angularjs.org/)

# References

 * [http://martinfowler.com/articles/injection.html](http://martinfowler.com/articles/injection.html)
 * [http://cheap.de/science/inwersja-kontroli-kontenerow-i-wzorzec-dependency-injection](http://cheap.de/science/inwersja-kontroli-kontenerow-i-wzorzec-dependency-injection)
 * [http://tutorials.jenkov.com/dependency-injection/index.html](http://tutorials.jenkov.com/dependency-injection/index.html)
 * [https://code.google.com/p/google-guice/wiki/Motivation](https://code.google.com/p/google-guice/wiki/Motivation)
 * [Spring Framework Presentation]({{ site.baseurl }}/wiki/spring-core-presentation)