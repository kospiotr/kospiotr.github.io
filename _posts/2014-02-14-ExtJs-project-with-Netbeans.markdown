---
layout: post
title:  "ExtJS project"
description: "Introduction to ExtJS framework with Netbeans IDE"
date:   2014-02-14 22:16:00
---
Usually when it comes to develop Single Page Application (SPA) we choose GWT.  For simple apps we use native components, GWT-Bootstrap or custom components created with DOM utils. For Enterprise applications we don’t risk and go with GXT.


GXT is well done components library by Sencha for GWT that looks and behaves like their flag product – ExtJS. In this article we will leave Java world and for a while we will check how to create SPA applications in JavaScript with ExtJS.


For our purpose I will show how to develop simple application for Bids using Netbeans that has amazing support for many JS libraries included ExtJS.

#Prepare Netbeans project

Create new project:

<img alt="screenshot" src="/img/2013-12-04-21_43_09-NetBeans-IDE-7.4.png"/>

Create HTML5 project:

<img alt="screenshot" src="/img/2013-12-04-21_44_16-New-Project.png"/>

And call it BidProject:
 
<img alt="screenshot" src="/img/2013-12-04-21_45_21-New-HTML5-Application.png"/>

Next use empty template:

<img alt="screenshot" src="/img/2013-12-04-21_46_27-New-HTML5-Application.png"/>

Don’t add existing ExtJS as you will find only version `3.4.1`. Netbeans uses external CdnJS service that allows to shuttle JS libraries to the project:

<img alt="screenshot" src="/img/2013-12-04-21_52_57-NetBeans-IDE-7.4.png"/>

The project now is ready:

<img alt="screenshot" src="/img/2013-12-04-21_58_37-BidProject-NetBeans-IDE-7.4.png"/>

#Add ExtJS library

Download the latst ExtJS library from here: [http://www.sencha.com/products/extjs/download/](http://www.sencha.com/products/extjs/download/). In our case it is `ExtJS 4.2.1`. Remember that ExtJS has dual license and for commercial project you must buy license.

Lets prepare project structure:

 1. Extract file and copy resources to public_html folder of the project
 2. Put ext-all-debug.js to extjs folder inside public_html folder
 3. Create app folder inside public_html folder
 4. Create empty file app.js inside public_html folder
 5. The structure should look like this:

<img alt="screenshot" src="/img/2013-12-04-22_27_46-BidProject-NetBeans-IDE-7.4.png"/>

Now we need to add ExtJS and prepare an Entry point of our application:

Edit `index.html` and add ExtJs styles and library:

```xml
<!--ExtJS-->
<link rel="stylesheet" type="text/css" href="resources/css/ext-all.css">
<script type="text/javascript" src="extjs/ext-all-debug.js"></script>
```

next add entry point to the page:

```xml
    <!--EntryPoint-->
    <script type="text/javascript" src="app.js"></script>
```
	
Entire `index.html` should look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>BidProject</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
 
    <!--ExtJS-->
    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css">
    <script type="text/javascript" src="extjs/ext-all-debug.js"></script>
 
    <!--EntryPoint-->
    <script type="text/javascript" src="app.js"></script>
 
  </head>
  <body>
  </body>
</html>
```

Now we add sample content to Entry Point that we could see first results. Edit file `app.js` and add following content (don’t worry I will explain everything latter):


```javascript
Ext.application({
  name: 'Bidder',
  appFolder: 'app',
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [
        {
          title: 'MainContainer',
          html: 'Hello, world'
        }
      ]
    });
  }
});
```

We are done now with configuring ExtJS

#Deploy and run application

From the toolbar menu choose destination, where you would like to preview application (in my case embedded browser that is the best for fast prototyping):

<img alt="screenshot" src="/img/2013-12-04-23_05_49-BidProject-NetBeans-IDE-7.4.png"/>

Then on toolbar press play button <img src="/img/2013-12-04-23_07_28-BidProject-NetBeans-IDE-7.4.png" alt="Start Button"/> to run server. Results will be displayed below the code:

<img alt="screenshot" src="/img/2013-12-04-23_11_24-.png"/>

#Entry point

Now let’s explain some parts of Application Entry Point (`app.js`):

To configure application you need to pass configuration object to Ext.define function:

```javascript
Ext.application({});
```

Basic configuration contains:

* **name**: ‘Bidder’ – application name, it will be used latter as a prefix for namespace
* **appFolder**: ‘app’ – folder of the application components that will develop as our application grows. We will keep there our Views, Models, Controllers, Stores in package like (hierarhical) folder structure.
* **launch** – this is method (function) that will be called when application is ready to be initialized

When application is being initialized following code is being executed:

```javascript
Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [
        {
          title: 'MainContainer',
          html: 'Hello, world'
        }
      ]
    });
```

This code creates `Viewport`. This is a container that fills whole widow body space and resizes when the size of the window changes. This is also unique container that adopts automatically to the body if no components are attached to the page body yet.

Containers are components that can contain many other components like Panels, TabPanels, AccordionPanels. Child elements are defined as objects of items array. They can lay inside the container according to the layout defined by layout property.

In our case `Viewport` has single panel that lays inside in fit manner. By default if the object doesn’t have defined type it renders Panel component that has title and html properties.