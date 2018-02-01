---
layout: wiki
title: Angular
comments: false
toc: false
editurl: wiki/angular.md
---

# Creating components

* `<input [value]="firstName">` - Binds property value to the result of expression firstName.
* `<div [attr.role]="myAriaRole">`	- Binds attribute role to the result of expression myAriaRole.
* `<div [class.extra-sparkle]="isDelightful">` - Binds the presence of the CSS class extra-sparkle on the element to the truthiness of the expression isDelightful.
* `<div [style.width.px]="mySize">`	- Binds style property width to the result of expression mySize in pixels. Units are optional.
* `<button (click)="readRainbow($event)">` - Calls method readRainbow when a click event is triggered on this button element (or its children) and passes in the event object.
* `<my-cmp [(title)]="name">` - Sets up two-way data binding. Equivalent to: `<my-cmp [title]="name" (titleChange)="name=$event">`
* `<video #movieplayer ...><button (click)="movieplayer.play()"></video>` - Creates a local variable movieplayer that provides access to the video element instance in data-binding and event-binding expressions in the current template.
* `<p *myUnless="myExpression">...</p>` - The `*` symbol turns the current element into an embedded template. Equivalent to: `<ng-template [myUnless]="myExpression"><p>...</p></ng-template>`
* `<p>Employer: {{employer?.companyName}}</p>` - The safe navigation operator `(?)` means that the employer field is optional and if undefined, the rest of the expression should be ignored.
* 


# Versioning

# Internationalization (i18n)

* https://angular.io/guide/i18n

# Workspace

# Create own library with demo

**Initialize**

```
export LIB_NAME=my-lib
ng new ${LIB_NAME} --style scss
cd ${LIB_NAME}
mv src demo
sed -i -- 's/src/demo/' .angular-cli.json
npm install ng-packagr --save-dev
cat <<EOT > ng-package.json
{
  "\$schema": "./node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "public_api.ts"
  }
}
EOT
touch public_api.ts
```

**Add core module**
```
mkdir -p src/core
cat <<EOT > src/core/core.module.ts 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CoreModule { }
EOT
echo "export * from './src/core/core.module'" >> public_api.ts
```


# Resources

* [https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e](https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e)
* [https://www.npmjs.com/package/ng-packagr](https://www.npmjs.com/package/ng-packagr)
* [https://github.com/jvandemo/generator-angular2-library](https://github.com/jvandemo/generator-angular2-library)
* [https://github.com/lerna/lerna](https://github.com/lerna/lerna)
* [https://www.npmjs.com/package/@storybook/angular](https://www.npmjs.com/package/@storybook/angular)
