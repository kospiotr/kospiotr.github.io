---
layout: post
title:  "Testing Node applications with Intern framework"
description: "Unit tests in TDD with Intern"
date:   2015-03-01 22:16:00
---

#Introduction

In JS world, regressions may appear at every change without any warning, so tests are equally important as production code. The same rule applies to every non static typed languages, but let's stay on JS. 

Intern is a complete framework for testing JavaScript Web sites and applications. I will use it to demostrate how to test NodeJS applications using intern framework. First I configure testing infrastructure so we could start writing business logic and testing it.

#Set up infrastructure

## Create Node project

Create NodeJS project:

```
mkdir intern-unit-tests
cd intern-unit-tests
```

Create init ```package.json```:

```js
{
  "name": "intern-unit-tests",
  "version": "1.0.0",
  "description": ""
}
```

## Implementing REST endpoint using ExpressJS

### Install ExpressJS:

```
npm install express --save-dev
```

### Implement application endpoints

We will create application code in ```src``` directory:

```
mkdir src
```

Create file: ```src/app.js```:

```js
var express = require('express');
var app = express();

app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});
console.log('App is configured');
module.exports = app;
```

Above application hosts ```/test``` endpoint which returns JSON: ```{status: 'ok'}``` and logs activity each activity.

## Hosting application on the server

To host that application we will need server.

Create file: ```src/server.js```:

```js
var app = require('./app');
app.listen(8080);
console.log('Application is running on port 8080');
```

Lets run server:

```
node src/server
```

Console output should display:

```
App is configured
Application is running on port 8080
hitting test
```

And when hitting: ```http://localhost:8080/test``` in the browser you should get:

```js
{
"status": "ok"
}
```

## Install and initialize Grunt

Before we start writing tests we need some test executor. For this purpose I use Grunt.

### Installing Grunt dependencies

If you never used Grunt before you must first install it globally:

```
npm install -g grunt
```

Install Grunt locally:

```
npm install grunt --save-dev
```

### Grunt configuration

Configure grunt, create ```Gruntfile.js```:

```js
module.exports = function (grunt) {
    grunt.initConfig({
    });

    grunt.registerTask('default', []);
};
```

Now if you execute: ```grunt``` you should have such console output:

```
Done, without errors.
```

## Install and configure Intern

### Installing Intern dependencies

Install Intern dependency:

```
npm install intern --save-dev
```

### Intern configuration

Create tests directory:

```
mkdir test
```

Prepare intern configuration by copying example from intern directory:

```
cp node_modules/intern/tests/example.intern.js test/intern-config.js
```

## Create first unit test

```
mkdir test/unit
```

Create file, ```test/unit/appTest.js```:

```js
define(function (require) {
    var suite = require('intern!object');
    var expect = require('intern/chai!expect');


    suite({
        ' strings': function () {
            expect("Piotr").to.equal('Piotr');
        }
    });
});
```

## Execute Intern tests with Grunt

Now we are ready to prepare test executor. 


### Configure Grunt

Lets modify ```Gruntfile.js```:

```js
module.exports = function (grunt) {

    grunt.initConfig({
        intern: {
            unit_testing: {
                options: {
                    config: 'test/intern-config',
                    suites: ['test/unit/appTest']
                }
            }
        }
    });

    grunt.loadNpmTasks('intern');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['intern']);

};

```
This configuration loads ```intern``` task, configures ```intern:unit_testing``` task and assignes it to ```test``` alias task.

### Executing Intern tests

Lets execute first unit task:

```
grunt test
```

With output:

```
Running "intern:unit_testing" (intern) task
>> PASS: main -  -  strings (0ms)
>> 0/1 tests failed
>> 0/1 tests failed
```

## Summary

At this point we have configure:

* REST application with ```/test``` endpoint
* Server that hosts that application
* Configured task executor, and tasks configuration
* Configured test framework with unit suites
* Written first unit test which actually doesn't test application, but was made to check if everything works fine

Pretty much, isn't it?

#Implement business logic

At this point we have configured infrastructure that allows now to focus on business aspect of our application.
We will implement simple calculator service that will be called via http and return data as JSON. Mind that this method is no more REST as it focuses more on resources. I believe this way is more RPC.

I will follow best practices, so I will implement Calculator feature in TDD style. The sequence is:

1. Write interface that will deliver business contract / signature
2. Write simple test which uses business signature but doesn't pass as the method is not implemented 
3. Implement business method to pass existing test
4. Write more complex test which doesn't pass
5. Fix test by modifying implementation
6. Refactor implementation

## Write interface that will deliver business contract / signature

Create business logic file ```src/calculator.js```:

```js
module.exports = {
    
    add: function(arg1, arg2){
        return null;
    },
    subtract: function(arg1, arg2){
        return null;
    },
    multiple: function(arg1, arg2){
        return null;
    },
    divide: function(arg1, arg2){
        return null;
    }
    
}
```

## Write simple test which uses business signature but doesn't pass as the method is not implemented

Create unit test file for business the file which holds the logic ```test/unit/calculatorTest.js```:

```js
define(function (require) {
    var suite = require('intern!object');
    var expect = require('intern/chai!expect');
    var instance = require('intern/dojo/node!../../src/calculator');


    suite({
        'should add 1 and 2 which equals 3': function () {
            expect(instance.add(1,2)).to.equal(3);
        }
    });
});
```

Now we must add this suite to the executions set in Grunt config file (```Gruntfile.js```):

```js
module.exports = function (grunt) {

    grunt.initConfig({
        intern: {
            unit_testing: {
                options: {
                    config: 'test/intern-config',
                    suites: ['test/unit/appTest','test/unit/calculatorTest']
                }
            }
        }
    });

    grunt.loadNpmTasks('intern');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['intern']);

};
```

And we can execute all tests:

```
grunt test
```

Which results in exception:

```
Running "intern:unit_testing" (intern) task
>> PASS: main -  -  strings (0ms)
>> 0/1 tests failed
>> FAIL: main -  - should add 1 and 2 which equals 3 (1ms)
AssertionError: expected null to equal 3

```

We expected that as we didn't implemented ```add``` method yet. We must write test first to prevent us from false positive situation.

## Implement business method to pass existing test

The simplest way to make test to pass is to return fixed 3. ```src/calculator.js``` is now:

```js
module.exports = {
    
    add: function(arg1, arg2){
        return 3;
    },
    subtract: function(arg1, arg2){
        return null;
    },
    multiple: function(arg1, arg2){
        return null;
    },
    divide: function(arg1, arg2){
        return null;
    }
    
}
```

And all tests are passing:

```
>> PASS: main -  - testing strings (0ms)
>> 0/1 tests failed
>> PASS: main -  - should add 1 and 2 which equals 3 (0ms)
>> 0/1 tests failed
>> 0/2 tests failed
```

You might ask WTF? why? how? but this is fake, that's bullshit!!!
I know I know, but this is first very important step that you shouldn't omit in TDD. We start from tiny detail and then it will evolve. Sometimes it's very hard to implement feature at once and this is first step to incremental development. Lets move forward.

## Write more complex test which doesn't pass

Now we add another test case:

```js
define(function (require) {
    var suite = require('intern!object');
    var expect = require('intern/chai!expect');
    var instance = require('intern/dojo/node!../../src/calculator');


    suite({
        'should add 1 and 2 which equals 3': function () {
            expect(instance.add(1,2)).to.equal(3);
        },
        'should add 5 and 6 which equals 11': function () {
            expect(instance.add(5,6)).to.equal(11);
        }
    });
});

```

which naturally doesn't pass:

```
>> PASS: main -  - testing strings (0ms)
>> 0/1 tests failed
>> PASS: main -  - should add 1 and 2 which equals 3 (0ms)
>> FAIL: main -  - should add 5 and 6 which equals 11 (1ms)
AssertionError: expected 3 to equal 11
```

## Fix test by modifying implementation

We are no longer able to put fixed numbers, so we need to implement ```add``` method as simply it's possible:

```js
module.exports = {
    
    add: function(arg1, arg2){
        return arg1+arg2;
    },
    subtract: function(arg1, arg2){
        return null;
    },
    multiple: function(arg1, arg2){
        return null;
    },
    divide: function(arg1, arg2){
        return null;
    }
    
}
```

Now the test again passess:

```
Running "intern:unit_testing" (intern) task
>> PASS: main -  - testing strings (0ms)
>> 0/1 tests failed
>> PASS: main -  - should add 1 and 2 which equals 3 (0ms)
>> PASS: main -  - should add 5 and 6 which equals 11 (0ms)
>> 0/2 tests failed
>> 0/3 tests failed
```

## Refactor implementation

If above code makes complex you should refactor it. If not implement the rest methods in the same way starting again from the 1'th point.
If all features are implemented we can start integrating calculator module with the rest of application.

#Integration

After implemented and tested code we can integrate it with other components of our application. Other components also should be unit tested. In this step we will expose our calculator method as a Web Service.

In ```src/app.js``` modify code:

```js
var express = require('express');
var calculator = require('./calculator');
var app = express();

app.get('/test', function (req, res) {
    console.log('hitting test');
    res.json({status: 'ok'});
});

app.get('/calculator/add', function (req, res) {
    
    var param1Int = parseInt(req.query.arg1);
    var param2Int = parseInt(req.query.arg2);
    
    var addResult = calculator.add(param1Int, param2Int);
    
    res.json({result: addResult});
});
console.log('App is configured');
module.exports = app;
```

As you can see we are using calculator instead having business logic inside endpoints handlers. Benefits:

* Business logic is encapsulated in own module
* The module is covered with unit tests
* The module can be reused in other parts of the application


# Summary

In this post I demonstrated how to set up testing environment for NodeJS application using Intern framework and Grunt task runner.
Literally just with few lines of code we can have tested our application with unit tests which are almost equally important as production code.
The next step is to test if our integration was success, but this will be covered in the next post.


Source code: [https://github.com/kospiotr/hello-js/tree/master/intern-unit-tests](https://github.com/kospiotr/hello-js/tree/master/intern-unit-tests)
