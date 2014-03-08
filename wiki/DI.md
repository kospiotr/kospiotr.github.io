---
layout: wiki
title: Dependency Injection
comments: false
gallery: true
toc: true
---

#What is dependency?
Wa are talking about dependency when one object relates on another one.


<a href="{{ site.url }}/img/dependency.png" data-gallery>
        <img src="{{ site.url }}/img/dependency.png" >
</a>

Code example:

```java
public class A{
	
	private B objB;
	
	public A {
		this.objB = new B();
	}
	
}
```

From real life example Web Action may need Data Access Object (DAO) to retrieve or save data to Data Base. Data Base actions is hidden in the DAO object (encapsulated).


<a href="{{ site.url }}/img/dependency.png" data-gallery class="pagination-centered">
        <img src="{{ site.url }}/img/dependency-example.png" class="pagination-centered">
</a>


Example implementation of Web Action:

```java
public class DisplayActiveUsersWebAction{
	
	protected UsersDAO usersDAO = new UsersDAO();
	
}
```

Above Web Action object instantiates dependant UsersDao object itself, which means that it satisfies its own dependency. In other words it configures itself.

#What's wrong with direct constructor calls - Inversion of Control motivation
Wiring everything together is a tedious part of application development. There are several approaches to connect data, service, and presentation classes to one another. To contrast these approaches, we'll write the billing code for a pizza ordering website:

```java
public interface BillingService {

  /**
   * Attempts to charge the order to the credit card. Both successful and
   * failed transactions will be recorded.
   *
   * @return a receipt of the transaction. If the charge was successful, the
   *      receipt will be successful. Otherwise, the receipt will contain a
   *      decline note describing why the charge failed.
   */
  Receipt chargeOrder(PizzaOrder order, CreditCard creditCard);
}
```

Here's what the code looks like when we just new up the credit card processor and transaction logger:

```java
public class RealBillingService implements BillingService {
  public Receipt chargeOrder(PizzaOrder order, CreditCard creditCard) {
    CreditCardProcessor processor = new PaypalCreditCardProcessor();
    TransactionLog transactionLog = new DatabaseTransactionLog();

    try {
      ChargeResult result = processor.charge(creditCard, order.getAmount());
      transactionLog.logChargeResult(result);

      return result.wasSuccessful()
          ? Receipt.forSuccessfulCharge(order.getAmount())
          : Receipt.forDeclinedCharge(result.getDeclineMessage());
     } catch (UnreachableException e) {
      transactionLog.logConnectException(e);
      return Receipt.forSystemFailure(e.getMessage());
    }
  }
}
```

This code poses problems for modularity and testability. In fact this code is not testable because of the following reasons:

 * If ```PaypalCreditCardProcessr``` or ```DatabaseTransactionLog``` has any dependencies like ```DatabaseConnection``` or ```RemoteTransactionArchiverWebService``` they will create them as well.
 * If we would like to test ```RealBillingService``` with unit tests the ```PaypalCreditCardProcessor``` will be created and we would perform operations on the real card processor. It means that we will the code will charge a real credit card during testing! In the tests we should operate on a ```FakeCreditCardProcessor```.
 * When using other providers like ```VisaCreditCardProcessor``` for ```CreditCardProcessor``` or ```BitCoinTransactionLog``` for ```TransactionLog``` will require code changes in the ```RealBillingService```.
 * It's also awkward to test what happens when the charge is declined or when the service is unavailable.

#Inversion of control implementations
The problem with above example is that those dependencies are created directly by the ```RealBillingService```. Instead the ready to use objects should be prepared externally and be delivered to the object that operates on them. This object delivery from external place is called Inversion of Control as control over the object creation has been inverted. 

<blockquote>Inversion of control is sometimes facetiously referred to as the "Hollywood Principle: Don't call us, we'll call you".</blockquote>
 
There are few implementations of Inversion of Control:

 * Factory pattern
 * Service locator pattern
 * Dependency injection
  * A constructor injection
  * Parameter injection
  * A setter injection
  * An interface injection
 * Contextualized lookup
 * Template method design pattern
 * Strategy design pattern

#References

 * [http://martinfowler.com/articles/injection.html](http://martinfowler.com/articles/injection.html)
 * [http://cheap.de/science/inwersja-kontroli-kontenerow-i-wzorzec-dependency-injection](http://cheap.de/science/inwersja-kontroli-kontenerow-i-wzorzec-dependency-injection)
 * [http://tutorials.jenkov.com/dependency-injection/index.html](http://tutorials.jenkov.com/dependency-injection/index.html)
 * [https://code.google.com/p/google-guice/wiki/Motivation](https://code.google.com/p/google-guice/wiki/Motivation)