---
layout: post
title:  "Angular 2 + uikit application"
date:   2016-09-17 18:00:00
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

# uikit styles

Replace`home.html` content:

```
<div class="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">

  <div class="uk-grid" data-uk-grid-margin>
    <div class="uk-width-medium-1-1">

      <div class="uk-vertical-align uk-text-center"
           style="background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTEzMHB4IiBoZWlnaHQ9IjQ1MHB4IiB2aWV3Qm94PSIwIDAgMTEzMCA0NTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDExMzAgNDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGNUY1RjUiIHdpZHRoPSIxMTMwIiBoZWlnaHQ9IjQ1MCIvPg0KPC9zdmc+DQo=') 50% 0 no-repeat; height: 450px;">
        <div class="uk-vertical-align-middle uk-width-1-2">
          <h1 class="uk-heading-large">Sample Heading</h1>
          <p class="uk-text-large">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac
            cursus commodo.</p>
          <p>
            <a class="uk-button uk-button-primary uk-button-large" href="#">Button</a>
            <a class="uk-button uk-button-large" href="#">Button</a>
          </p>
        </div>
      </div>

    </div>
  </div>
</div>
```

Result:

![NG2 seed app]({{site.baseurl}}/img/2016-09-17_app-page-no-styles.png)

Need to tell webpack how to build uikit theme and bundle them with app. 

Install uikit as a npm module. We will need it later as an runtime dependency so save it with `--save` :

```
npm install uikit --save
```

Install less and other resource loaders for webpack. We will use them only for building app so use `--save-dev` :

```
npm install --save-dev less-loader style-loader less url-loader file-loader
```

In `webpack.config.js` :

```
  module: {
    loaders: [
      ...
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.(ttf|eot|svg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
    ]
  }
```

Create `src/styles.less` file with content:

```
@import "../node_modules/uikit/themes/default/uikit.less";

@icon-font-path: "../../fonts"; //fixing wrong relative path
```

Add as a first line to file `main.browser.ts`:

```
import './styles.less';
```

Need to restart watch process in order to apply new loaders.

Result:

![NG2 seed app]({{site.baseurl}}/img/2016-09-17_app-page-with-styles.png)

# uikit dynamic elements

So far static elements like panels or buttons are showing properly. However dynamic components using javascript will fail.

Modify `about.html` file by adding on the end:

```

<!-- This is the anchor toggling the modal -->
<a class="uk-button uk-button-primary" href="#my-id" data-uk-modal>Open dialog</a>

<!-- This is the modal -->
<div id="my-id" class="uk-modal">
  <div class="uk-modal-dialog uk-modal-dialog-lightbox">
    <a href="" class="uk-modal-close uk-close uk-close-alt"></a>
    This is a dialog box
  </div>
</div>
```

Open [http://localhost:3000/#/about](http://localhost:3000/#/about) page and click button. Result:

![NG2 seed app]({{site.baseurl}}/img/2016-09-17_app-page-no-js.png)

This is actually because we didn't povided all required scripts (dependencies) yet.

Need to install runtime dependencies. uikit is already installed, however it requires also jQuery. Install jquery runtime dependencies as a npm module and save it using `--save` :

```
npm install jquery --save
npm install imports-loader --save-dev
```

Add uikit with jquery as it's dependency to be bundled for the browser. Add below code to the bottom of `vendor.browser.ts` :

```
require("imports?$=jquery/src/jquery!uikit");
```
Result:

![NG2 seed app]({{site.baseurl}}/img/2016-09-17_app-page-with-js.png)

