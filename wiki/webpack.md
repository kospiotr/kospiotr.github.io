---
layout: wiki
title: Webpack
comments: false
toc: true
editurl: wiki/webpack.md
---

# CLI
- build: ```webpack --inline --colors --progress --display-error-details --display-cached```
- server ```webpack-dev-server --inline --colors --progress --display-error-details --display-cached --port 3000  --content-base src```

# Require options:

By the way there are several ways to require a third-party lib:

- CommonJs `require("./vendor/jquery/jquery.js")` (sync)
- AMD require `require(["./vendor/jquery/jquery.js"], function($) { xyz })` (async)
- AMD define `define(["./vendor/jquery/jquery.js"], function($) { xyz })` (sync)

If you don't want to provide a path: `require("jquery")` `require(["jquery"], function($) {})` `define(["jquery"], function($) {}):`
- by option: `resolve: { alias: { jquery: "/path/to/jquery" } }`
- by directory: Put jquery into a folder `web_modules.
- If you just want to use `$` and `jQuery` without require:
  - option: `provide: { $: "/path/to/jquery", jQuery: "/path/to/jquery" }`

# Resources

- [Configuration API](https://github.com/webpack/docs/wiki/configuration)
- [Core plugins list](https://github.com/webpack/docs/wiki/list-of-plugins)
- [Angular2 with webpack explained](https://angular.io/docs/ts/latest/guide/webpack.html)
- [Webpack book by survivejs.com](http://survivejs.com/webpack/introduction/)
