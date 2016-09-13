---
layout: wiki
title: JavaScript
comments: false
toc: true
description: Java Script notes
res: ../../resources/wiki/js
editurl: wiki/java-script.md
---

# Basis

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

### Using `call`

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

### Using `apply`

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

### Using `bind`

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

## Protecting properties

### Preventing extensions - can't add new properties

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

### Sealing - can't add and remove properties

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

### Freezing Objects - can't add, remove properties and change properties; they are read only.

TBD

# Object Constructing

## Factory pattern

```javascript

function createPerson(name) {
  var person = new Object();
  person.name = name;
  
  return person;
}

// objectcts of the class
var person1 = createPerson('Piotr');
var person2 = createPerson('Paulina');

// the type is defined
console.log(person1.name); // Piotr
console.log(person2.name); // Paulina
```

## Constructor Pattern

```javascript

// the Person constructor 
function Person() {
  this.name = 'Piotr';
  this.greeting = function(){
    return 'Hello, ' + this.name;
  }
}

// objectcts of the class
var person1 = new Person();
var person2 = new Person();

// the type is defined
console.log(person1 instanceof Person); // true
console.log(person1.name); // Piotr
console.log(person1.greeting()); // Hello, Piotr
console.log(person2 instanceof Person); // true
console.log(person2.name); // Piotr
console.log(person2.greeting()); // Hello, Piotr
```

Pros:

- very simple

Const:

- not effectively share methods across multiple objects


## Constructor Pattern (with parameter)

```javascript
function Person(name) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  };
}

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name); // "Nicholas"
console.log(person2.name); // "Greg"

person1.sayName(); // outputs "Nicholas"
person2.sayName(); // outputs "Greg"
```

## Constructor Pattern (with private members)

```javascript
function Person(name) {
  // define a variable only accessible inside of the Person constructor
  var age = 25;
  this.name = name;
  
  this.getAge = function() {
    return age;
  };
  this.growOlder = function() {
    age++;
  };
}

var person = new Person("Nicholas");
console.log(person.name); // "Nicholas"
console.log(person.getAge()); // 25

person.age = 100;
console.log(person.getAge()); // 25

person.growOlder();
console.log(person.getAge()); // 26
```

# Encapsulation

## Object literals

```javascript

var age = 25;

var person1 = {
  getName: 'Piotr',
  getAge: function(){
    return age;
  }
}

age = 30;

var person2 = {
  getName: 'Paweł',
  getAge: function(){
    return age;
  }
}
```

## Module pattern

```javascript
var person = (function() {

  var age = 25;

  return {
    name: "Nicholas",
    getAge: function() {
      return age;
    },
    growOlder: function() {
      age++;
    }
  };

}());

console.log(person.name); // "Nicholas"
console.log(person.getAge()); // 25

person.age = 100;
console.log(person.getAge()); // 25

person.growOlder();
console.log(person.getAge()); // 26
```

Pros:

- Aggregates API in one place
- Expose only public members
- Singleton implementation – through immediate invoke functions

Const:

- Functions are duplicated across objects in memory
- Not easy to extend and debug

## Revealing Module Pattern

```javascript
var person = (function() {

  var age = 25;

  function getAge() {
    return age;
  }

  function growOlder() {
    age++;
  }

  return {
    name: "Nicholas",
    getAge: getAge,
    growOlder: growOlder
  };

}());
```

## Augmentation Module Pattern

```javascript
var person = (function() {

  var age = 25;
  
  var api = {};
  api.name = "Nicholas";
  api.getAge = function() {
      return age;
  };
  api.growOlder = function() {
      age++;
  };

  return api;

}());

console.log(person.name); // "Nicholas"
console.log(person.getAge()); // 25

person.age = 100;
console.log(person.getAge()); // 25

person.growOlder();
console.log(person.getAge()); // 26
```

# Inheritance

## Prototype pattern - add common functionality by modifying prototype

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(this.name);
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1.name); // "Nicholas"
console.log(person2.name); // "Greg"

person1.sayName(); // outputs "Nicholas"
person2.sayName(); // outputs "Greg"
```

## Prototype pattern - add common functionality by replacing prototype

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person, // need to declare back the constructor as it would become an object
  sayName: function() {
    console.log(this.name);
  },
  toString: function() {
    return "[Person " + this.name + "]";
  }
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

console.log(person1 instanceof Person); // true
console.log(person1.constructor === Person); // true

console.log(person1.constructor === Object); // false
console.log(person2 instanceof Person); // true

console.log(person2.constructor === Person); // true
console.log(person2.constructor === Object); // false
```

## Parasitic Combination Inheritance Pattern (prototype inheritance)

```javascript
'use strict'

console.clear();

var Figure = (function(){
    function Figure(){
        console.log('Figure constructor called');
    }

    // all methods must go to prototype in order to effectively share them across multiple objects
    // those methods can operate onnly on the public properties that are inherited and that subtypes overrides
    Figure.prototype.getArea = function(){
        throw 'Not implemented'
    }

    Figure.prototype.toString = function(){
        return 'Figure';
    }    

    return Figure;
})();

var Rectangle = (function(FigureConstructor){
    function Rectangle(width, height){

        // constructor stealing
        FigureConstructor.call(this);

        //private variables
        var width = width;
        var height = height;

        //getters without setters make such object immutable and perfectly encapsulated
        //if setWitdh and setHeight would be created and exposed 
        //then the Square class should shadow both of them
        this.getWidth = function(){
            return width;
        }

        this.getHeight = function(){
            return height;
        }


        console.log('Rectangle constructor called');
    }

    //Class.prototype = FigureConstructor.prototype; - wrong because modify prototype of the Figure
    //Class.prototype = Object.create(new FigureConstructor()); wrong as it calls default constructor and creates
    //                                                          instance which state is shared among Rectangles and 
    //                                                          can be altered. If stealing also constructor then it's
    //                                                          called twice!!
    
    //inherits prototype Figure API but must remember to execute inherited constructor as well
    //this creates prototype chain Rectangle.prototype === Object -> Object.prototype === Figure.prototype
    Rectangle.prototype = Object.create(FigureConstructor.prototype) 
    Rectangle.prototype.constructor = Rectangle; //pointing back constructor
    
    //shadows but no replcaes Figure getArea
    Rectangle.prototype.getArea = function(){
        return this.getWidth() * this.getHeight();
    }

    Rectangle.prototype.toString = function(){
        return 'Rectangle';
    }    
    

    return Rectangle;
})(Figure);

var Square = (function(RectangleConstructor){
    function Square(size){
        RectangleConstructor.call(this, size, size);
        console.log('Square constructor called');
    }

    Square.prototype = Object.create(RectangleConstructor.prototype);
    Square.prototype.constructor = Square; //pointing back constructor
    
    Square.prototype.toString = function(){
        return 'Square';
    }    

    return Square;
})(Rectangle);



console.log('===== creating Figure');
var figure = new Figure('other');
console.log('figure name: ' + figure.toString());
console.log('figure instance Figure: ' + (figure instanceof Figure));
//console.log(f.getArea()); - exception

console.log('===== creating Rectangle')
var rectangle = new Rectangle(2,3);
console.log('rectangle name: ' + rectangle.toString());
console.log('rectangle area: ' + rectangle.getArea());
console.log('rectangle instance Rectangle: ' + (rectangle instanceof Rectangle));
console.log('rectangle instance Figure: ' + (rectangle instanceof Figure));


console.log('===== creating Square')
var square = new Square(4);
console.log('square name: ' + square.toString());
console.log('square area: ' + square.getArea());
console.log('square instance Square: ' + (square instanceof Square));
console.log('square instance Rectangle: ' + (square instanceof Rectangle));
console.log('square instance Figure: ' + (square instanceof Figure));
```

Output:

```
===== creating Figure
Figure constructor called
figure name: Figure
figure instance Figure: true
===== creating Rectangle
Figure constructor called
Rectangle constructor called
rectangle name: Rectangle
rectangle area: 6
rectangle instance Rectangle: true
rectangle instance Figure: true
===== creating Square
Figure constructor called
Rectangle constructor called
Square constructor called
square name: Square
square area: 16
square instance Square: true
square instance Rectangle: true
square instance Figure: true
```


![Inheritance]({{page.res}}/InheritanceJS.png)

# Extensions

## Mixins

Mixins occur when one object acquires the properties of another without modifying the prototype chain. The first object (a receiver) actually receives the properties of the second object (the supplier) by copying those properties directly.

```javascript
function mixin(receiver, supplier) {
  for (var property in supplier) {
    if (supplier.hasOwnProperty(property)) {
      receiver[property] = supplier[property]
    }
  }
  return receiver;

}
```

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

# Resources

[https://addyosmani.com/resources/essentialjsdesignpatterns/book/](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
