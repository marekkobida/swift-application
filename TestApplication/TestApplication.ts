/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';

import Application from '../Application';

class TestApplication extends Application {
  constructor() {
    super(
      'Testovacia aplikácia, ktorá po pridaní vytvorí HTTP server.',
      `file://${path.resolve(__dirname, './client.html')}`,
      'TestApplication',
      '1.0.0',
    );
  }

  afterAdd() {
    this.httpServer.on('request', (request, response) => {
      response.setHeader('Content-Type', 'application/json');

      return response.end(JSON.stringify(this.toJSON()));
    });
  }
}

export default TestApplication;
