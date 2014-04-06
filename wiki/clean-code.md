---
layout: wiki
title: Clean Code
description: How to write good quality code?
comments: false
gallery: true
toc: true
editurl: wiki/clean-code.md
---


# Object Oriented
# High cohesion
# SOLID principles
## Single responsibility principle
###What is SRP?

The term was introduced by _Robert C. Martin_.
It is the ‘S’ from the SOLID principles, which are the basis for OOD.
[http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)](http://en.wikipedia.org/wiki/SOLID_(object-oriented_design) "SOLID at Wikipedia")
Here’s the PDF paper for SRP by Robert C. Martin[https://docs.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/](https://docs.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/)

![Single responsibility](http://www.comodotnet.com/Media/Default/Graphics/SingleResponsibilityPrinciple.jpg)

From Wikipedia:
> …In object-oriented programming, the single responsibility principle states that every class should have a single responsibility, and that responsibility should be entirely encapsulated by the class. All its services should be narrowly aligned with that responsibility….

From&nbsp;_Clean Code_:
> A class or module should have one, and only one,&nbsp;**reason to change**.

So if a class (or module) needs to be modified for more than one reason, it does more than one thing. I.e. has more than one responsibility.

###**Why SRP?**

*   **Organize the code**

Let’s imagine a car mechanic who owns a repair shop.
He has many many tools to work with. The tools are divided into types; Pliers, Screw-Drivers (Phillips / Blade), Hammers, Wrenches (Tubing / Hex) and many more.
How would it be easier to organize the tools?
Few drawers with different types in each one of them?
Or, many small drawers, each containing a specific type?
Now, imagine the drawer as the&nbsp;_module_. This is why many small modules (classes) are more organized then few large ones.

*   **Less fragile**

When a class has more than one reason to be changed, it is more fragile.
A change in one location might lead to some unexpected behavior in totally other places.

*   **Low Coupling**

More responsibilities lead to higher coupling.
The couplings are the responsibilities.
Higher coupling leads to more dependencies, which is harder to maintain.

*   **Code Changes**

Refactoring is much easier for a single responsibility module.
If you want to get the&nbsp;_shotgun effect_, let your classes have more responsibilities.

*   **Maintainability**

It’s obvious that it is much easier to maintain a small single purpose class, then a big monolithic one.

*   **Testability**

A test class for a ‘one purpose class’ will have less test cases (branches).
If a class has one purpose it will usually have less dependencies, thus less mocking and test preparing.
The “self documentation by tests” becomes much clearer.

*   **Easier Debugging**

Since I started doing TDD and test-first approach, I hardly debug. Really.
But, there come times when I must debug in order to understand what’s going on.
In a single responsibility class, finding the bug or the cause of the problem, becomes a much easier task.

###**What needs to have single responsibility?**

Each part of the system.

*   The methods
*   The classes
*   The packages
*   The modules

**How to Recognize a Break of the SRP?**

*   **Class Has Too Many Dependencies**

A constructor with too many input parameters implies many dependencies (hopefully you do inject dependencies).
Another way too see many dependencies is by the test class.
If you need to mock too many objects, it usually means breaking the SRP.

*   **Method Has Too Many Parameters**

Same as the class’s smell. Think of the method’s parameters as dependencies.

*   **The Test Class Becomes Too Complicated**

If the test has too many variants, it might suggest that the class has too many responsibilities.
It might suggest that some methods do too much.

*   **Class / Method is Long**

If a method is long, it might suggest it does too much.
Same goes for a class.
My rule of thumb is that a class should not exceed 200-250 LOC. Imports included&nbsp;![;-)](http://s1.wp.com/wp-includes/images/smilies/icon_wink.gif?m=1129645325g)

*   **Descriptive Naming**

If you need to describe what your class / method / package is using with the&nbsp;_AND_&nbsp;world, it probably breaks the SRP.

*   **Class With Low Cohesion**

Cohesion is an important topic of its own and should have its own post.
But Cohesion and SRP are closely related and it is important to mention it here.
In general, if a class (or module) is not cohesive, it probably breaks the SRP.
A hint for a non-cohesive class:
The class has two fields. One field is used by some methods. The other field is used by the other methods.

*   **Change In One Place Breaks Another**

If a change in the code to add a new feature or simply refactor broke a test which seems unrelated, it might suggest a breaking the SRP.

*   **Shotgun Effect**

If a small change makes a big ripple in your code. If you need to change many locations it might suggest, among other smells, that the SRP is broken.

*   **Unable to Encapsulate a Module**

I will explain using Spring, but the concept is important (not the implementation).
Suppose you use the @Configuration or XML configuration.
If you can’t encapsulate the beans in that configuration, it should give you a hint of too much responsibility.
The Configuration should hide any inner bean and expose minimal interfaces.
If you need to change the Configuration due to more than one reason, then, well, you know…

### **How to make the design compliant with the Single Responsibility Principle**

The suggestions below can apply to other topics of the SOLID principles.
They are also good for any Clean Code suggestion.
But here they are aimed for the Single Responsibility Principle.

*   **Awareness**

This is a general suggestion for clean code.
We need to be aware of our code. We need to take care.
As for SRP, we need to try and catch as early as we can a class that is responsible for too much.
We need to always look for a ‘too big method’.

*   **Testable Code**

Write your code in a way that everything can be tested.
Then, you will surly want that your tests be simple and descriptive.

*   **TDD**

(I am not going to add anything here)

*   **Code Coverage Metrics**

Sometimes, when a class does too much, it won’t have 100% coverage at first shot.
Check the code quality metrics.

*   **Refactoring and Design Patterns**

For SRP, we’ll mostly do extract-method, extract-class, move-method.
We’ll use composition and strategy instead of conditionals.

*   **Clear Modularization of the System**

When using a DI injector (Spring), I think that Configuration class (or XML) can pinpoint the modules design. And modules’ single responsibility.
I prefer to have several small to medium size of configuration files (XML or Java) than having one big file / class.
It helps see the responsibility of the module and easier to maintain.
I think that the configuration approach of injection has an advantage of annotation approach. Simply because the Configuration approach put the modules in the spotlight.

### Example

Before:

```java
class Person{
    String name;
    Strnig surname
    String streetName;
    String streetNo;
    String flatNo;
    String zip;
    String country;
}
```

After:

```java
class Person{
    String name;
    Strnig surname
    Address address;
}

class Address{
    String streetName;
    String streetNo;
    String flatNo;
    String zip;
    String country;
}
```

###**Conclusion**
As I mentioned in the beginning of this post, I think that Single-Responsibility-Principle is the basis of a good design.
If you have this principle in your mind while designing and developing, you will have a simpler more readable code.
Better design will be followed.

As always, one needs to be careful on how to apply practices, code and design.
Sometimes we might do over-work and make simple things over complex.
So a common sense must be applied at any refactor and change.

##Open/closed principle
### What is the Open/Closed Principle?
It’s a principle for object oriented design first described by Bertrand Meyer that says that
> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

At first thought that might sound quite academic and abstract. What it means though is that we should strive to write code that doesn’t have to be changed every time the requirements change. How we do that can differ a bit depending on the context, such as our programming language. When using OO language or some other statically typed language the solution often involves inheritance and polymorphism, which is what this example will illustrate.

### An Example – calculating area

Let’s say that we’ve got a Rectangle class. As most rectangles that I’ve encountered it has a width and a height.

```java
@Data
class Rectangle {

    private double width;
    private double height;

}
```

Now our customer, wants us to build an application that can calculate the total area of a collection of rectangles.

That’s not a problem for us. We learned in school that the area of a rectangle is it’s width multiplied with it’s height and we mastered the for-each-loop a long time ago.

```java
public class AreaCalculator {

    public double Area(Rectangle[] shapes) {
        double area = 0;
        for (Rectangle shape : shapes) {
            area += shape.getWidth() * shape.getHeight();
        }

        return area;
    }
}
```

We present our solution, the AreaCalculator class to the client and he signs us his praise. But he also wonders if we couldn’t extend it so that it could calculate the area of not only rectangles but of circles as well.

That complicates things a bit but after some pondering we come up with a solution where we change our Area method to accept a collection of objects instead of the more specific Rectangle type. Then we check what type each object is of and finally cast it to it’s type and calculate it’s area using the correct algorithm for the type.

```java
class AreaCalculator {

    public double Area(Object[] shapes) {
        double area = 0;
        for (Object shape : shapes) {
            if (shape instanceof Rectangle) {
                Rectangle rectangle = (Rectangle) shape;
                area += rectangle.getWidth() * rectangle.getHeight();
            } else {
                Circle circle = (Circle) shape;
                area += circle.getRadius() * circle.getRadius() * Math.PI;
            }
        }

        return area;
    }
}
```

The solution works and Aldford is happy.

Only, a week later he calls us and asks: “extending the AreaCalculator class to also calculate the area of triangles isn’t very hard, is it?”. Of course in this very basic scenario it isn’t but it does require us to modify the code. That is, AreaCalculator isn’t **closed for modification** as we need to change it in order to extend it. Or in other words: it isn’t **open for extension**.

In a real world scenario where the code base is ten, a hundred or a thousand times larger and modifying the class means redeploying it’s assembly/package to five different servers that can be a pretty big problem. Oh, and in the real world Aldford would have changed the requirements five more times since you read the last sentence :-)

### A solution that abides by the Open/Closed Principle

One way of solving this puzzle would be to create a base class for both rectangles and circles as well as any other shapes that Aldford can think of which defines an abstract method for calculating it’s area.

<pre class="prettyprint"><span class="kwd">public</span><span class="pln"> </span><span class="kwd">abstract</span><span class="pln"> </span><span class="kwd">class</span><span class="pln"> </span><span class="typ">Shape</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
    </span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">abstract</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Area</span><span class="pun">();</span><span class="pln">
</span><span class="pun">}</span></pre>

Inheriting from Shape the Rectangle and Circle classes now looks like this:

<pre class="prettyprint"><span class="kwd">public</span><span class="pln"> </span><span class="kwd">class</span><span class="pln"> </span><span class="typ">Rectangle</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="typ">Shape</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
    </span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Width</span><span class="pln"> </span><span class="pun">{</span><span class="pln"> </span><span class="kwd">get</span><span class="pun">;</span><span class="pln"> </span><span class="kwd">set</span><span class="pun">;</span><span class="pln"> </span><span class="pun">}</span><span class="pln">
    </span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Height</span><span class="pln"> </span><span class="pun">{</span><span class="pln"> </span><span class="kwd">get</span><span class="pun">;</span><span class="pln"> </span><span class="kwd">set</span><span class="pun">;</span><span class="pln"> </span><span class="pun">}</span><span class="pln">
    </span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">override</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Area</span><span class="pun">()</span><span class="pln">
    </span><span class="pun">{</span><span class="pln">
        </span><span class="kwd">return</span><span class="pln"> </span><span class="typ">Width</span><span class="pun">*</span><span class="typ">Height</span><span class="pun">;</span><span class="pln">
    </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><span class="pln">

</span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">class</span><span class="pln"> </span><span class="typ">Circle</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="typ">Shape</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
    </span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Radius</span><span class="pln"> </span><span class="pun">{</span><span class="pln"> </span><span class="kwd">get</span><span class="pun">;</span><span class="pln"> </span><span class="kwd">set</span><span class="pun">;</span><span class="pln"> </span><span class="pun">}</span><span class="pln">
    </span><span class="kwd">public</span><span class="pln"> </span><span class="kwd">override</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Area</span><span class="pun">()</span><span class="pln">
    </span><span class="pun">{</span><span class="pln">
        </span><span class="kwd">return</span><span class="pln"> </span><span class="typ">Radius</span><span class="pun">*</span><span class="typ">Radius</span><span class="pun">*</span><span class="typ">Math</span><span class="pun">.</span><span class="pln">PI</span><span class="pun">;</span><span class="pln">
    </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span></pre>

As we’ve moved the responsibility of actually calculating the area away from AreaCalculator’s Area method it is now much simpler and robust as it can handle any type of Shape that we throw at it.

<pre class="prettyprint"><span class="kwd">public</span><span class="pln"> </span><span class="kwd">double</span><span class="pln"> </span><span class="typ">Area</span><span class="pun">(</span><span class="typ">Shape</span><span class="pun">[]</span><span class="pln"> shapes</span><span class="pun">)</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
    </span><span class="kwd">double</span><span class="pln"> area </span><span class="pun">=</span><span class="pln"> </span><span class="lit">0</span><span class="pun">;</span><span class="pln">
    </span><span class="kwd">foreach</span><span class="pln"> </span><span class="pun">(</span><span class="kwd">var</span><span class="pln"> shape </span><span class="kwd">in</span><span class="pln"> shapes</span><span class="pun">)</span><span class="pln">
    </span><span class="pun">{</span><span class="pln">
        area </span><span class="pun">+=</span><span class="pln"> shape</span><span class="pun">.</span><span class="typ">Area</span><span class="pun">();</span><span class="pln">
    </span><span class="pun">}</span><span class="pln">

    </span><span class="kwd">return</span><span class="pln"> area</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span></pre>

In other words we’ve closed it for modification by opening it up for extension.

### When should we apply the Open/Closed Principle?

If we look back our previous example, where did we go wrong? Clearly even our first implementation of the Area wasn’t open for extension. Should it have been? I’d say that it all depends on context. If we had had very strong suspicions that Aldford would ask us to support other shapes later on we could probably have prepared for that from the get-go. However, often it’s not a good idea to try to anticipate changes in requirements ahead of time, as at least my psychic abilities haven’t surfaced yet and preparing for future changes can easily lead to overly complex designs. Instead, I would suggest that we focus on writing code that is well written enough so that it’s easy to change if the requirements change.

Once the requirements do change though it’s quite likely that they will change in a similar way again later on. That is, if Aldford asks us to support another type of shape it’s quite likely that he soon will ask for support for a third type of shape.

So, in other words, I definitely think we should have put some effort into abiding by the open/closed principle once the requirements started changing. Before that, in most cases, I would suggest limiting your efforts to ensuring that the code is well written enough so that it’s easy to refactor if the requirements starts changing.

### More examples of the Open/Closed Principle?

If you’ve got any other good and straight forward examples of the open/closed principle I’d love to hear about them as I really enjoy studying the SOLID principles in general and different ways to apply OCP in particular.

Any other feedback is of course also most welcome!

_PS. For updates about new posts, sites I find useful and the occasional rant you can [follow me on Twitter](http://twitter.com/joelabrahamsson)&nbsp;<span class="wrc_icon wrc13" rating="{&quot;icon&quot;:&quot;icn_extensiontop_green.png&quot;,&quot;rating&quot;:1,&quot;weight&quot;:3,&quot;flags&quot;:{&quot;shopping&quot;:null,&quot;social&quot;:null,&quot;news&quot;:null,&quot;it&quot;:null,&quot;corporate&quot;:null,&quot;pornography&quot;:null,&quot;violence&quot;:null,&quot;gambling&quot;:null,&quot;drugs&quot;:null,&quot;illegal&quot;:null}}"></span>. You are also most welcome to subscribe to [the RSS-feed.](http://feeds.feedburner.com/JoelAbrahamsson)&nbsp;<span class="wrc_icon wrc13" rating="{&quot;icon&quot;:&quot;icn_extensiontop_green.png&quot;,&quot;rating&quot;:1,&quot;weight&quot;:3,&quot;flags&quot;:{&quot;shopping&quot;:null,&quot;social&quot;:null,&quot;news&quot;:null,&quot;it&quot;:null,&quot;corporate&quot;:null,&quot;pornography&quot;:null,&quot;violence&quot;:null,&quot;gambling&quot;:null,&quot;drugs&quot;:null,&quot;illegal&quot;:null}}"></span>_
##Liskov substitution principle
##Interface segregation principle
##Dependency inversion principle
#DRY - dont't repeat yourself (code reuse)
#KISS

* Keep it simple stupid
* Keep it simple and short
* Keep it simple, short and specific


#SoC - separation of concerns