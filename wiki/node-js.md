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

* Grunt configuration `Gruntfile.js`:

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

* dev-dependency:

 * `npm install grunt-contrib-connect --save-dev`

##Grunt Watch + LiveReload for Real-time JavaScript/LESS/SASS Compilation

* **Dependencies** (`package.json`):

```js
{
  "name": "my-project-name",
  "version": "0.0.1",
  "dependencies": {
    "grunt-cli": "latest",
    "grunt-contrib-concat": "latest",
    "grunt-contrib-uglify": "latest",
    "grunt-contrib-less": "latest",
    "grunt-contrib-watch": "latest"
  }
}

```

Grunt-cli: `sudo npm install -g grunt-cli`

Install dependencies: `npm install`

* **Structure**:

```
/javascript
  /jquery.js
  /functions.js
  /app.js
/less
  /_header.less
  /_footer.less
  /_body.less
  /style.less
/public
  /css
    /style.css
  /js
    /main.min.js
```

* **Grunt coniguration**:

```js
module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
 
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'javascript/*.js'
        ],
        dest: 'public/js/main.min.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'public/js/main.min.js': ['public/js/main.min.js']
        }
      }
    },
    less: {
      style: {
        files: {
          "public/css/style.css": "less/style.less"
        }
      }
    },
    watch: {
      js: {
        files: ['javascript/*.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['less/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: true,
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
};
```

#Extra resources
 * [Refcard](../resources/nodejs.pdf)
 * [Getting Started With Grunt and Bower/](http://www.nitinh.com/2013/05/getting-started-with-grunt-bower/)
