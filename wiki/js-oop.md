---
layout: wiki
title: JS OOP
comments: false
toc: true
editurl: wiki/js-oop.md
---

# Functions

## This

`this` binds by default to the given current object:

```
var person = {
  name: "Nicholas",
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName(); // outputs "Nicholas"
```

But the context can be different:

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

## Rebinding `this`

* Using `call` :

```
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: "Nicholas"
};

sayNameForAll.call(person1, "person1"); // outputs "person1:Nicholas"
```

It accepts multiple arguments and replaces `this`.

* Using `apply` :

```
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: "Nicholas"
};

sayNameForAll.apply(person1, ["person1"]); // outputs "person1:Nicholas"
```

It accepts arguments as an array and replaces `this`.

* Using `bind` :

```
function sayNameForAll(label) {
  console.log(label + ":" + this.name);
}

var person1 = {
  name: "Nicholas"
};

var person2 = {
  name: "Greg"
};

// create a function just for person1
u var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1"); // outputs "person1:Nicholas"

// create a function just for person2
v var sayNameForPerson2 = sayNameForAll.bind(person2, "person2");
sayNameForPerson2(); // outputs "person2:Greg"

// attaching a method to an object doesn't change 'this'
w person2.sayName = sayNameForPerson1;
person2.sayName("person2"); // outputs "person2:Nicholas"
```

It creates proxy for the given method which replaces `this`.


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
