---
layout: post
title:  "REST end to end testing Node applications with Intern framework"
description: "Testing REST with Intern"
date:   2015-03-03 22:16:00
---

# Introduction

In the previous post [Testing Node applications with Intern framework]({{< relref "2015-03-01-unit-tests-with-intern" >}} "About Us") I demostrated how to set up testing environment for unit tests with Intern and Grunt.
Today I will show how to test REST endpoints with end to end tests in a speed of unit tests.

#Set up infrastructure

## Create Node project

Create NodeJS project:

```
mkdir intern-end-to-end-tests
cd intern-end-to-end-tests
```

Create init ```package.json```:

```js
{
  "name": "intern-end-to-end-tests",
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

## Create first test

```
mkdir test/e2e
```

Create file, ```test/e2e/testRestTest.js```:

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
            e2e_testing: {
                options: {
                    config: 'test/intern-config',
                    suites: ['test/e2e/testRestTest']
                }
            }
        }
    });

    grunt.loadNpmTasks('intern');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['intern']);

};

```
This configuration loads ```intern``` task, configures ```intern:e2e_testing``` task and assignes it to ```test``` alias task.

### Executing Intern tests

Lets execute test task:

```
grunt test
```

With output:

```
Running "intern:e2e_testing" (intern) task
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

# Create real end to end test

At this point we have configured infrastructure that allows now to focus on creating real end to end test.
The sequence of the testing is:

1. Prepare Express application and host it on the local server
2. Execute all suite test cases which will call local REST endpoint and ensure they are valid
3. Shut down server

## Full example

Full example of the test lokks as below:

```js
define(function (require) {
    var suite = require('intern!object'),
        app = require('intern/dojo/node!../../src/app'),
        chai = require('intern/dojo/node!chai'), //dellivers promieses implementation used in setup method
        expect = chai.expect,
        chaiHttp = require('intern/dojo/node!chai-http'), //dellivers promieses implementation used in setup method
        q = require('intern/dojo/node!q'), //dellivers promieses implementation used in setup method
        portfinder = require('intern/dojo/node!portfinder'); //dellivers promieses implementation used in setup method

    var me = this;
    var api = function () {
        return chai.request('http://localhost:' + me.port);
    }

    suite({
        'setup': function () {
            chai.use(chaiHttp); //configure chai with chaiHttp
            chai.request.addPromises(q.Promise); //configure promise for chaiHttp

            var deferred = q.defer();
            portfinder.getPort(function (err, port) {
                me.port = port;
                me.server = app.listen(me.port, function () {
                    console.log('server is running on port %j', me.port);
                    deferred.resolve();
                });
            });
            return deferred.promise;

        },
        'teardown': function () {
            me.server.close();
        },
        'shoud test return status ok json': function () {
            return api()                                        //prepare url
                .get('/test')                                   //make a call
                .then(function (res) {                          //return call result
                    expect(res.body).to.eql({status: 'ok'});    //make assertions with chai
                });
        },
        'another test': function () {
            return api()
                .get('/test')
                .then(function (res) {
                    expect(res.body).to.eql({status: 'ok'});
                });
        }
    });
});

```

and it requires following dependencies:

```
npm install chai chai-http q portfinder --save-dev
``` 

## Explanation

### Dependencies

* chai - is an assertion library that allows to ensure some preconditions, like ```request body must equals json: {status: 'ok'}```
* chai-http - is a plugin for chai that allows to construct and handles HTTP calls, for example making GET call to http://localhost:8080/test
* q - is a library that allows working with promises in NodeJS application, which allows to work with asynhronous tests
* portfinder - is a simple tool to find an open port or domain socket on the current machine


### Lifecycle

When Intern tests are executed, the test system follows a specific lifecycle:

For each registered root suite:

* The ```setup``` method of the suite is called, if it exists
* For each test within the suite:
    *  The ```beforeEach``` method of the suite is called, if it exists
      *  The test function is called
    *  The ```afterEach``` method of the suite is called, if it exists
* The ```teardown``` method of the suite is called, if it exists

In order to start server once for all tests and close it on the end of the suite we will start it in ```setup``` method and shut it down in ```teardown```.

Source: [https://theintern.github.io/intern/#test-lifecycle](https://theintern.github.io/intern/#test-lifecycle)

### Asynchronous tests

Most of the testing will be asynchronous, for example all HTTP calls are asynchronous, server will start in asynchronous and also finding free port is asynchronous. Intern support two mechanisms of handling asynchronous tests:

* Using ```this.async()```
* Promises

First method is very simple, but doesn't work in lifecycle methods, and looks disgusting. This way is documented very well in the Intern guide so I won't go this way.
The benefits with promises are:

* They are supported in tests and also in lifecycle methods. If simple tests doesn't require to handle asynchronous methods in for example ```setup``` method you don't need go with promises. As we will start server we need to stick with promises.
* They looks much more better, and I mean they are more easy to write so also maintain.
* Soon they will become standard
* Easy to use in Intern test

Promise is not supported out of the box, and we need to deliver it with one of many existing libraries. In ths case we will use ```q``` library.
Promise interface from ```q``` needs to be registred with ```chai-http``` in order to support ```then``` method which returns promise.

To make test to be asynchronous with promise, the only thing to do is to return promise. This is why we return ```.then``` in the test.

Source: [https://theintern.github.io/intern/#async-tests](https://theintern.github.io/intern/#async-tests)

### Improvements

Intern allows to execute suites simultaneously. If we start many end to end suites it might turn out that we are using same port. To detect free port and use it I use ```portfinder``` library.


# Summary

In this post I demonstrated how to set up testing environment for NodeJS application using Intern framework and Grunt task runner. Then I've modified simple unit tests to run local server with endpoints which needs to be tested. After that we are able to call them and assure that responses are correct. Please notice that the speed of set up the whole server doesn't differ so much from unit tests.

Source code: [https://github.com/kospiotr/hello-js/tree/master/intern-end-to-end-tests](https://github.com/kospiotr/hello-js/tree/master/intern-end-to-end-tests)
