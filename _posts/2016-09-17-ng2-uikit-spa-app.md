---
layout: post
title:  "Angular 2 + uikit application"
date:   2016-09-17 18:00:00
draft: true
---

# Prerequisite

- GIT
- NodeJS and NPM
- global NPM libraries: `sudo npm install -g webpack webpack-dev-server typescript`

# Init Angular 2 project with seed

Clone repo from [https://github.com/angular/angular2-seed](https://github.com/angular/angular2-seed): 

```
git clone git@github.com:angular/angular2-seed.git ng2uikit-app
```

Install dependencies:

```
cd ng2uikit-app
npm install
```

Run app:

```
npm start
```

Go to [http://localhost:3000](http://localhost:3000)

Result:

![NG2 seed app]({{site.baseurl}}/img/2016-09-17_init-ng-app-page.png)

# Add dependencies

Install jquery and uikit runtime dependencies as a npm module:

```
npm install jquery uikit --save
```

Add typescript 

```
typings install dt~jquery --global --save jquery
```
