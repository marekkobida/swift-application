`npm install https://github.com/marekkobida/swift-application`

## TestApplication.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>TestApplication</title>
  </head>
  <body>
    TestApplication
  </body>
</html>
```

## TestApplication.js

```js
const path = require('path');

const Application = require('@swift/application/Application');

class TestApplication extends Application.default {
  constructor() {
    super(
      'TestApplication',
      `file://${path.resolve(__dirname, './TestApplication.html')}`,
      'TestApplication',
      '1.0.0',
    );
  }

  afterAdd() {
    console.log('afterAdd');
  }

  afterDelete() {
    console.log('afterDelete');
  }
}

exports.default = TestApplication;
```
