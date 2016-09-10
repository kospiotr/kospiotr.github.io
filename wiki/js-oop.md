---
layout: wiki
title: JS OOP
comments: false
toc: true
editurl: wiki/js-oop.md
---

# Functions

## This

```
function sayNameForAll() {
  console.log(this.name);
}

var person1 = {
  name: "Nicholas",
  sayName: sayNameForAll
};

var person2 = {
  name: "Greg",
  sayName: sayNameForAll
};

var name = "Michael";
person1.sayName(); // outputs "Nicholas"
person2.sayName(); // outputs "Greg"

sayNameForAll(); // outputs "Michael"
```

# Principles

* **Encapsulation** -  Data can be grouped together with functionality that operates on that data. This, quite simply, is the definition of an object.
* **Aggregation** -  One object can reference another object.
* **Inheritance** -  A newly created object has the same characteristics as another object without explicitly duplicating its functionality.
* **Polymorphism** - One interface may be implemented by multiple objects.

# Class

# Object

# Aggregation

# Inheritance

# Polymorphism
