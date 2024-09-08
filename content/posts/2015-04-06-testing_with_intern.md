---
layout: post
title:  "Testing with Intern"
description: "Quality assurance with Intern"
date:   2015-04-06 22:16:00
draft: true
---

# Introduction

In the previous posts ["Testing Node applications with Intern framework"]({% post_url 2015-03-01-unit-tests-with-intern %}) I demostrated how to set up testing environment for unit tests with Intern and Grunt and in ["REST end to end testing Node applications with Intern framework"]({% post_url 2015-03-03-end-to-end-tests-with-intern %}) I demonstrated how to test REST endpoints with end to end tests in a speed of unit tests.
Today I will show how to organize Quality Assurance environment for Unit, Integration and Functional tests.

# Grunt and task conventions

Here are tasks which we are using while testing:

- `test` - execute all tests (unit, integration, functional)
- `testing` - as above in a watch loop, reexecutes tests when implementation or test sources changes
- `test-unit` - execute unit tests
- `testing-unit` - as above in a watch loop, reexecutes tests when implementation or test sources changes
- `test-functional` - execute functional
- `testing-functional` - as above in a watch loop, reexecutes tests when implementation or test sources changes
- `test-integration` - execute integration tests
- `testing-integration` - as above in a watch loop, reexecutes tests when implementation or test sources changes 

Require

- `var suite = require('intern!object')` - require internal intern suite object
- `var tester = require('../lib/restServerTester')` - require AMD styled file
- `var express = require('intern/dojo/node!express')` - require CommonJS module
- `var swagger = require('intern/dojo/node!../../index')` - require custom CommonJS module from relative path
