`npm install https://github.com/marekkobida/swift-application`

## TestApplication

### TestApplication.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TestApplication</title>
  </head>
  <body>
    <h1>TestApplication</h1>
    <p id="httpServerUrl"></p>
    <script>
      const url = new URL(window.location.href);

      const httpServerUrlFromUrlSearchParameters = url.searchParams.get(
        'httpServerUrl',
      );

      document.getElementById(
        'httpServerUrl',
      ).innerHTML = httpServerUrlFromUrlSearchParameters;
    </script>
  </body>
</html>
```

### TestApplication.js

```js
const path = require('path');

const Application = require('@swift/application/Application');

class TestApplication extends Application.default {
  constructor() {
    super(
      'Testovacia aplikácia, ktorá po pridaní vytvorí HTTP server.',
      `file://${path.resolve(__dirname, './TestApplication.html')}`,
      'TestApplication',
      '1.0.0',
    );
  }

  afterAdd() {
    super.afterAdd();

    this.httpServer.on('request', (request, response) => {
      response.setHeader('Content-Type', 'application/json');

      return response.end(JSON.stringify(this.toJSON()));
    });
  }
}

exports.default = TestApplication;
```
