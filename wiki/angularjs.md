---
layout: wiki
title: AngularJS
comments: false
toc: false
editurl: wiki/angularjs.md
---

Get scope by element

```
angular.element(document.getElementById('id')).scope()
```

Controller inheritance:

```
var app = angular.module('angularjs-starter', []);

app.controller('ParentCtrl ', function($scope) {
  // I'm the sibling, but want to act as parent
});

app.controller('ChildCtrl', function($scope, $controller) {
  $controller('ParentCtrl', {$scope: $scope}); //This works
});
```
