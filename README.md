```
const Application = require('@swift/application/Application').default;

class TestApplication extends Application {
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
