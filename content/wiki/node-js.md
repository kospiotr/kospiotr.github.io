---
title: NodeJS
---

# Node

* `npm init` - initialize nodejs project
* `node server.js` - starts node app from server.js file
* `nodemon server.js` - starts node app from server.js file and when detects changes restarts server
* `npm install -g nodemon` - installs globally nodemon

## Configuration

Install `config` plugin: `npm install config --save`, and then store configuration in `config` directory in separated files (it supports different file types):

`config/default.json`:

```js
{
  // Customer module configs
  "Customer": {
    "dbConfig": {
      "host": "localhost",
      "port": 5984,
      "dbName": "customers"
    },
    "credit": {
      "initialLimit": 100,
      // Set low for development
      "initialDays": 1
    }
  }
}
```

`config/production.json`:

```js
{
  "Customer": {
    "dbConfig": {
      "host": "prod-db-server"
    },
    "credit": {
      "initialDays": 30
    }
  }
}
```

Use the configuration in the code:

```js
var config = require('config');
...
var dbConfig = config.get('Customer.dbConfig');
db.connect(dbConfig, ...);
```

Run application with global variable defining configuration:

```js
$ export NODE_ENV=production
$ node my-app.js
```

## Debugging

Install `node-inspector`: `npm install node-inspector -g`
Run it: `node-inspector`
Visit http://127.0.0.1:8080/debug?port=5858 to start debugging.
Start an app with flag: `--debug`

## Logging

Install `node-logg` plugin with: `npm install logg --save`.
Usage:

```js
var logging = require('logg');

var logger = logging.getLogger('my.class');
logger.setLogLevel(logging.Level.WARN);
logger.info('This will not show up');
logger.warn('But warnings will', new Error('aargg'));
```

Then emitting messages:

```js
logg.on('', function(logRecord) { /* ... */});
```

For storing logs in system directory `node-syslog` can be used:

```js
var logg = require('logg');
var syslog = require('node-syslog');

// setup syslog
syslog.init('kickq', syslog.LOG_PID | syslog.LOG_ODELAY, syslog.LOG_LOCAL0);

// do not log to console.
logg.removeConsole();

// listen for log messages
logg.on('', function(logRecord) {

  // format the message
  var message = logg.formatRecord(logRecord, true);

  // relay to syslog using LOG_INFO for WARN and above messages
  // LOG_DEBUG for the test
  if (logg.Level.WARN <= logRecord.level) {
    syslog.log(syslog.LOG_INFO, message);
  } else {
    syslog.log(syslog.LOG_DEBUG, message);
  }
});
```
# Browser sync

**Installation**
```sudo npm install -g browser-sync``` 

**CLI**
- current dir: ```browser-sync start -s . -f .```
- build dir: ```browser-sync start -s build -f build```
- 
# Grunt

* `npm install -g grunt-cli` - install grunt
* `npm install --save-dev grunt` - install grunt as dev dependency to the project configuration
* `npm install -g grunt-init` - install grunt-init which is a scaffolding tool used to automate project creation
* `git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile` - installs `gruntfile` template for grunt-init
* `grunt-init gruntfile` - generate Grunt / NodeJS project

## Load all grunt tasks automatically

Install `load-grunt-tasks` plugin with: `npm install --save-dev load-grunt-tasks`, then instead:

```js
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-recess');
grunt.loadNpmTasks('grunt-sizediff');
grunt.loadNpmTasks('grunt-svgmin');
```

You got:

```js
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
}
```

## Load grunt tasks from external files

In `Gruntfile.js`:

```js
module.exports = function (grunt) {
  grunt.loadTasks('grunt-tasks'); // load per-task config from separate files from directory grunt-tasks
}
```

Then place in directory task file: `grunt-tasks/clean.task.js`:

```js
/**
 * @fileOverview The clean task operation.
 */
module.exports = function (grunt) {
  grunt.config('clean', {
    build: ['build']
  });
  grunt.loadNpmTasks('grunt-contrib-clean'); // this line can be skipped if load-grunt-tasks plugin is being used

};
```

# Express

## Minimalistic Express app

* `package.json`:

```js
{
	"name": "sample-express",
	"main": "server.js",
	"dependencies": {
		"express": "~4.0.0"
	}
}
```

* `server.js`:

```js
// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.use("/", express.static(__dirname + '/public'));
app.get('/sample', function (req, res) {
  res.send('this is a sample!');
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('App started on port ' + port);
```

## Minimalistic Express app with Grunt and watch

* `package.json`:

```js
{
    "name": "sample-express",
    "main": "server.js",
    "engines": {
        "node": ">= 0.10.0"
    },
    "dependencies": {
        "express": "~4.0.0"
    },
    "devDependencies": {
        "grunt": "~0.4.5",
        "grunt-contrib-watch": "^0.6.1",
        "grunt-express-server": "^0.4.19"
    }
}

```

* `Gruntfile.js`:

```js
module.exports = function (grunt) {

    grunt.initConfig({
        express: {
            dev: {
                options: {
                    script: 'server.js',
                    debug: true,
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    background: false
                }
            }
        },
        watch: {
            express: {
                files: ['**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['express:prod']);
    grunt.registerTask('dev', ['express:dev', 'watch']);

};
```

* `server.js`:

```js
// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.use("/", express.static(__dirname + '/public'));
app.get('/sample', function (req, res) {
  res.send('this is a sample!');
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('App started on port ' + port);
```

# Bower

# Yeoman

# Webpack

`--display-error-details` - show error details

# Testing tools list

Comparisons: https://theintern.github.io/#compare

## Test runners

 - Karma - allows for running unit/integration tests in a real browser like Chrome, FF, PhantomJS
 - Protractor - Protractor is an end-to-end test framework for AngularJS applications. Protractor is a Node.js program built on top of WebDriverJS. Protractor runs tests against your application running in a real browser, interacting with it as a user would.
 - CasperJS - "CasperJS is a navigation scripting & testing utility which uses headless browsers."
 - Intern - fully feature runner / framework toolkit

## Test definitions

- Jasmine - is a fullyfeature Behavior Driven Development testing framework for JavaScript with .
- Mocha - simple plain test runner. 

## Assertion Libraries

 - [should.js](https://github.com/shouldjs/should.js) - BDD style shown throughout these docs
 - [chai](http://chaijs.com/) - expect(), assert() and should style assertions
 - [expect.js](https://github.com/LearnBoost/expect.js) - expect() style assertions
 - [expectations](https://github.com/spmason/expectations) - Jasmine-style expect()
 - [unit.js](https://github.com/unitjs/unit.js) - simple, fluent assertions
 - [unexpected](https://unexpectedjs.github.io/) - extensible BDD assertion toolkit
 - [inspect.js](https://inspectjs.com/) - modern BDD style assertion library

## Mocks, Stubs, & Spies

  - [sinon.js](http://sinonjs.org/) - Test spies, stubs and mocks for JavaScript.
  - [simple-mock](https://github.com/jupiter/node-simple-mock) - Super simple mocks, stubs, and spies with 1-step sandbox restore.
  - [nock](https://github.com/pgte/nock) - HTTP mocking and expectations library.

## Other

- Selenium 
- PhantomJS 

Resources:

 - http://thejsguy.com/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html
 - http://andyshora.com/unit-testing-best-practices-angularjs.html
 - https://karma-runner.github.io
 - https://github.com/jasmine/jasmine

# Examples

## Grunt + Http server

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

## Grunt Watch + LiveReload for Real-time JavaScript/LESS/SASS Compilation

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

## Simple app Grunt + Watch + Live reload + compile less + build release

Structure:

```
src
├───frontend
│   │   index.html
│   │
│   ├───css
│   ├───js
│   │       app.js
│   │
│   └───less
│           style.less
│
└───shared
```

Dependencies:

```
{
  "name": "SpintenseJS",
  "version": "0.0.1",
  "dependencies": {},
  "devDependencies": {
    "grunt-cli": "~0.1.13",
    "grunt-contrib-concat": "~0.4.0",
    "grunt-contrib-connect": "~0.8.0",
    "grunt-contrib-uglify": "~0.5.0",
    "grunt-contrib-less": "~0.11.2",
    "grunt-contrib-watch": "~0.6.1",
    "grunt-express": "~1.3.5",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-jshint": "~0.10.0"
  }
}

```

Grunt configuration:

```
module.exports = function (grunt) {

    grunt.registerTask('simple-build',
        [ 'clean:build', 'concat:js', 'copy:html', 'copy:css', 'less:style']);

    grunt.registerTask('watch-dev',
        [ 'simple-build', 'connect', 'watch' ]);

    grunt.registerTask('watch-build',
        [ 'connect', 'watch' ]);

    grunt.registerTask('build',
        [ 'simple-build', 'uglify:js' ]);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'build/public',
                    livereload: true
                }
            }
        },
        watch: {
            js: {
                files: 'src/frontend/js/**/*.js',
                tasks: ['concat:js']
            },
            html: {
                files: 'src/frontend/**/*.html',
                tasks: ['copy:html']
            },
            css: {
                files: 'src/frontend/**/*.css',
                tasks: ['copy:css']
            },
            less: {
                files: 'src/frontend/**/*.less',
                tasks: ['less:style']
            },
            devLiveReload:{
                options: {
                    livereload: true
                },
                files: 'build/**/*.*'
            }
        },
        clean: {
            build:['build']
        },
        concat: {
            js: {
                src: ['src/frontend/js/**/*.js'],
                dest: 'build/public/js/app.js'
            }
        },
        copy: {
            html: {
                expand: true, flatten: true,
                src: 'src/frontend/*.html',
                dest: 'build/public/'
            },
            css: {
                expand: true, flatten: true,
                src: 'src/frontend/css/*.css',
                dest: 'build/public/css/'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'build/public/js/app.js': ['build/public/js/app.js']
                }
            }
        },
        less: {
            style: {
                files: {
                    "build/public/css/style.css": "src/frontend/less/style.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
};
```

## Popular modules

# Extra resources

 * [Refcard](../resources/nodejs.pdf)
 * [Getting Started With Grunt and Bower/](http://www.nitinh.com/2013/05/getting-started-with-grunt-bower/)
 * [Bower notes](http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774)
 * [Bower notes](http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/)
 * [NodeJS modules](http://nodejs.org/api/modules.html#loading_from_node_modules_Folders)
