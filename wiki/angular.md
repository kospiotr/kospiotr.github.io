---
layout: wiki
title: Angular
comments: false
toc: false
editurl: wiki/angular.md
---

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

* [https://github.com/jvandemo/generator-angular2-library](https://github.com/jvandemo/generator-angular2-library)
* [https://github.com/lerna/lerna](https://github.com/lerna/lerna)
* [https://www.npmjs.com/package/@storybook/angular](https://www.npmjs.com/package/@storybook/angular)
