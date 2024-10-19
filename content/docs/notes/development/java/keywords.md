---
title: Keywords
---

# Overview
Java keywords are predefined words in the Java programming language that have a special meaning to the compiler. These keywords are reserved and cannot be used as identifiers (e.g., variable names, class names, or method names). They serve various purposes, such as defining data types, control flow statements, and class declarations. Understanding these keywords is essential for writing syntactically correct and logically structured Java programs.

# List of Java Keywords
Here’s a categorized list of the 52 reserved keywords in Java:

## 1. **Data Types Keywords**
- `boolean` : Declares a Boolean variable (`true` or `false`).
- `byte` : Declares a byte variable (8-bit integer).
- `char` : Declares a character variable (16-bit Unicode character).
- `short` : Declares a short integer variable (16-bit integer).
- `int` : Declares an integer variable (32-bit integer).
- `long` : Declares a long integer variable (64-bit integer).
- `float` : Declares a floating-point variable (32-bit).
- `double` : Declares a double-precision floating-point variable (64-bit).

## 2. **Access Modifiers**
- `public` : Specifies that a class, method, or variable can be accessed from any other class.
- `private` : Specifies that a method or variable can only be accessed within its own class.
- `protected` : Specifies that a method or variable can be accessed within its own package and by subclasses.

## 3. **Class and Object Keywords**
- `class` : Declares a class.
- `interface` : Declares an interface.
- `extends` : Indicates that a class is inheriting from a superclass.
- `implements` : Indicates that a class is implementing an interface.
- `new` : Creates new objects.
- `this` : Refers to the current instance of a class.
- `super` : Refers to the superclass of the current object.
- `abstract` : Declares an abstract class or method that cannot be instantiated.
- `final` : Declares constants, prevents method overriding, or inheritance.
- `static` : Indicates that a field or method belongs to the class rather than instances of the class.
- `enum` : Declares an enumerated type.
- `instanceof` : Tests whether an object is an instance of a specified class or subclass.

## 4. **Control Flow Statements**
- `if` : Starts an `if` statement to execute code based on a condition.
- `else` : Specifies the block of code to execute if the `if` condition is false.
- `switch` : Starts a `switch` statement that executes code based on a variable’s value.
- `case` : Defines individual cases in a `switch` statement.
- `default` : Specifies the default case in a `switch` statement.
- `while` : Starts a loop that continues until a condition is false.
- `do` : Starts a `do-while` loop that executes at least once.
- `for` : Starts a `for` loop for repeated execution.
- `break` : Exits from a loop or `switch` statement.
- `continue` : Skips the current iteration of a loop.
- `return` : Returns a value from a method.

## 5. **Exception Handling Keywords**
- `try` : Starts a block of code to be tested for exceptions.
- `catch` : Specifies a block of code to execute if an exception is thrown.
- `finally` : Specifies a block of code that will always execute after `try` and `catch`.
- `throw` : Throws an exception.
- `throws` : Declares that a method may throw exceptions.

## 6. **Synchronization and Concurrency Keywords**
- `synchronized` : Specifies that a method or block of code is synchronized.
- `volatile` : Indicates that a variable's value may be changed by multiple threads.

## 7. **Memory Management and Garbage Collection**
- `new` : Creates a new instance of a class.
- `delete` : Java doesn’t have an explicit keyword like `delete` for object removal, but memory is managed using the `null` keyword to dereference.

## 8. **Package and Import Keywords**
- `package` : Declares a package.
- `import` : Imports other Java packages and classes.

## 9. **Modifiers for Advanced Class Features**
- `native` : Specifies that a method is implemented in native code using JNI (Java Native Interface).
- `strictfp` : Ensures strict floating-point calculations.
- `transient` : Prevents serialization of certain fields.
- `assert` : Tests a condition in debugging.

## 10. **Unused / Reserved Keywords (for future use)**
- `const` : Reserved, but not used.
- `goto` : Reserved, but not used.

# Notes
- These keywords cannot be used as variable, method, class, or any other identifiers in your code.
- Each of these keywords serves a distinct purpose and helps define the structure and behavior of Java programs.
