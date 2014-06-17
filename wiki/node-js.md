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

##Simple app Grunt + Watch + Live reload + compile less + build release

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

##Popular modules

#Extra resources
 * [Refcard](../resources/nodejs.pdf)
 * [Getting Started With Grunt and Bower/](http://www.nitinh.com/2013/05/getting-started-with-grunt-bower/)
