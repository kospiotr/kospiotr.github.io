---
layout: wiki
title: JavaScript
comments: false
toc: true
description: Java Script notes
editurl: wiki/java-script.md
---

# Functions

## This

`this` binds by default to the given current object:

```javascript
var person = {
  name: "Nicholas",
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName(); // outputs "Nicholas"
```

But the context can be different:

```javascript
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

```javascript
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

```javascript
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

```javascript
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

# Objects

## Protecting properties

* Preventing extensions - can't add new properties

```javascript
var person1 = {
  name: "Nicholas"
};

console.log(Object.isExtensible(person1)); // true
Object.preventExtensions(person1);

console.log(Object.isExtensible(person1)); // false

person1.sayName = function() {
  console.log(this.name);
};

console.log("sayName" in person1); // false
```

* Sealing - can't add and remove properties

```javascript
var person1 = {
  name: "Nicholas"
};

console.log(Object.isExtensible(person1)); // true
console.log(Object.isSealed(person1)); // false

Object.seal(person1);
console.log(Object.isExtensible(person1)); // false
console.log(Object.isSealed(person1)); // true
person1.sayName = function() {
  console.log(this.name);
};

console.log("sayName" in person1); // false
person1.name = "Greg";
console.log(person1.name); // "Greg"
delete person1.name;

console.log("name" in person1); // true
console.log(person1.name); // "Greg"

var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.configurable); // false
```

* Freezing Objects - can't add, remove properties and change properties; they are read only.

## Object Oriented Programming

* **Encapsulation** -  Data can be grouped together with functionality that operates on that data. This, quite simply, is the definition of an object.
* **Aggregation** -  One object can reference another object.
* **Inheritance** -  A newly created object has the same characteristics as another object without explicitly duplicating its functionality.
* **Polymorphism** - One interface may be implemented by multiple objects.

### Class

### Object

### Aggregation

### Inheritance

### Polymorphism


# JSON

* `JSON.stringify(value[, replacer [, space]])` - serialize JS object to JSON
 Examples:

 ```javascript
JSON.stringify({});                  // '{}'
JSON.stringify(true);                // 'true'
JSON.stringify("foo");               // '"foo"'
JSON.stringify([1, "false", false]); // '[1,"false",false]'
JSON.stringify({ x: 5 });            // '{"x":5}'
JSON.stringify({x: 5, y: 6});        // '{"x":5,"y":6}' or '{"y":6,"x":5}'
JSON.stringify({ uno: 1, dos : 2 }, null, '\t')
// returns the string:
// '{            \
//     "uno": 1, \
//     "dos": 2  \
// }'
 ```

* `JSON.parse(text[, reviver])` - deserialize JS object from string
 Examples:

 ```javascript
try {
  JSON.parse('{}');              // {}
  JSON.parse('true');            // true
  JSON.parse('"foo"');           // "foo"
  JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
  JSON.parse('null');            // null
} catch (e) {
  console.error("Parsing error:", e);
}
 ```

# Debugger

* `debugger;` - stops debugger while execution this line of the code

# Ajax
## Sample vanilla post call

```js

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    console.log("got reply: "+xmlhttp.responseText);
    }
  }
xmlhttp.open("POST","/api/costumes",true); xmlhttp.send();

```
