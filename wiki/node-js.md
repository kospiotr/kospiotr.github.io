---
layout: wiki
title: NodeJS
comments: false
toc: true
editurl: wiki/node-js.md
---

#Node

* `npm init` - initialize nodejs project

#Grunt

* `npm install -g grunt-cli` - install grunt
* `npm install --save-dev grunt` - install grunt as dev dependency to the project configuration

#Bower

#Yeoman

#Examples
##Grunt + Http server

* `Gruntfile.js`:

```js
module.exports = function(grunt) {

  grunt.initConfig({
	connect: {
	  client: {
		options: {
		  port: 9000,
		  base:'public',
		  keepalive: true
		}
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['connect']);

};
```

dev-dependency:
* `npm install grunt-contrib-connect --save-dev`

#Extra resources
 * [Refcard](../resources/nodejs.pdf)
