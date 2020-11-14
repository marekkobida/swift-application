```js
const Application = require('@swift/application/Application');

class TestApplication extends Application.default {
  constructor() {
    super(
      'TestApplication',
      'https://github.com/marekkobida/swift-application',
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
