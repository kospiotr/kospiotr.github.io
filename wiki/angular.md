---
layout: wiki
title: Angular
comments: false
toc: false
editurl: wiki/angular.md
---

# Create own library with demo

*Initialize*

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

