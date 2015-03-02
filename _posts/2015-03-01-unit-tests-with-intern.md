---
layout: post
title:  "Testing Node applications with Intern framework"
date:   2015-03-01 22:16:00
toc: true
draft: true
---

#Introduction

In JS world, regressions may appear at every change without any warning, so tests are equally important as production code. The same rule applies to every non static typed languages, but let's stay on JS. 

Intern is a complete framework for testing JavaScript Web sites and applications. I will use it to demostrate how to test NodeJS applications using intern framework. First I configure testing infrastructure so we could start writing business logic and testing it.

#Set up infrastructure

## Create Node project

Create NodeJS project:

```
mkdir intern-integration-tests
```

Create init package.json:

```js
{
  "name": "intern-integration-tests",
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
mkdir
test/unit
```

Create file, ```test/unit/app.js```:

```js
define(function (require) {
    var suite = require('intern!object');
    var expect = require('intern/chai!expect');


    suite({
        'teting strings': function () {
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
                    suites: ['test/unit/app']
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
>> PASS: main -  - teting strings (0ms)
>> 0/1 tests failed
>> 0/1 tests failed
```

#Implement business logic

At this point we have configured infrastructure that allows now to focus on business aspect of our application.
We will implement simple calculator service that will be passing results of http call. Mind that this method is more like RPC now then REST, as REST focuses on resources.

I will follow TDD method so the sequence is:

1. Write interface that will deliver business contract / signature
2. Write simple test which uses business signature but doesn't pass as the method is not implemented 
3. Implement business method to pass existing test
4. Write more complex test which doesn't pass
5. Fix test by modifying implementation
6. Refactor implementation

## Write interface that will deliver business contract / signature
Create file:

#Summary

At this point we have configure:
* REST application with ```/test``` endpoint
* Server that hosts that application
* Configured task executor, and tasks configuration
* Configured test framework with unit suites
* Written first unit test which actually doesn't test application, but was made to check if everything works fine

Pretty much, isn't it?

Now we will change that unit test to actually test REST endpoint. But what actually we will be testing?
We will check if ```status``` is ```ok``` if we use ```/test``` enpoint. In order to do that we have to perform such steps:

* Prepare application endpoints configuration
* Start local application on server on ```8080``` port
* Execute http call to ```http://localhost:8080/test``` endpoint
* Check if result status is ```200```
* Check if body text is JSON
* Check if body text JSON is: ```{status: 'ok'}```

