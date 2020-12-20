/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';

class Application {
  readonly eventEmitter = new ApplicationEventEmitter();

  readonly httpServer = new ApplicationHttpServer();

  constructor(
    readonly description: string,
    readonly name: string,
    readonly version: string
  ) {}

  close() {
    this.httpServer.closeHttpServer();

    this.eventEmitter.emit('AFTER_CLOSE', this.toJson());
  }

  delete() {
    this.close();

    this.eventEmitter.emit('AFTER_DELETE', this.toJson());
  }

  open() {
    this.httpServer.openHttpServer();

    this.httpServer.on('request', (request, response) => {
      response.setHeader('Access-Control-Allow-Methods', '*');
      response.setHeader('Access-Control-Allow-Origin', '*');

      if (request.url === '/about') {
        response.setHeader('Content-Type', 'application/json');

        response.end(JSON.stringify(this.toJson()));
      }
    });

    this.eventEmitter.emit('AFTER_OPEN', this.toJson());
  }

  toJson() {
    return {
      description: this.description,
      httpServerUrl: this.httpServer.url(),
      name: this.name,
      path: new URL(path.join(__dirname), 'file://').toString(),
      version: this.version,
    };
  }
}

export default Application;
