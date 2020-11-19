/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';

const currentPath: string = (() => {
  if (typeof window === 'undefined') {
    return new URL(path.join(__dirname), 'file://').toString();
  }

  const scripts = document.getElementsByTagName('script');

  const src = scripts[scripts.length - 1].src;

  return src.substring(0, src.lastIndexOf('/'));
})();

class Application {
  httpServer = new ApplicationHttpServer();

  constructor(
    readonly description: string,
    readonly name: string,
    readonly version: string
  ) {
    if (typeof window === 'undefined') {
      this.httpServer.openHttpServer();

      this.httpServer.on('request', (request, response) => {
        response.setHeader('Access-Control-Allow-Methods', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        if (request.url === '/about') {
          response.setHeader('Content-Type', 'application/json');

          response.end(JSON.stringify(this.toJSON()));
        }
      });
    }
  }

  afterAdd() {}

  afterDelete() {}

  open(eventEmitter: ApplicationEventEmitter) {
    eventEmitter.on('AFTER_ADD', () => this.afterAdd());

    eventEmitter.on('DELETE', () => {
      if (typeof window === 'undefined') {
        this.httpServer.closeHttpServer();
      }

      this.afterDelete();

      eventEmitter.emit('AFTER_DELETE', this.toJSON());
    });

    eventEmitter.emit('ADD', this.toJSON());
  }

  toJSON() {
    return {
      description: this.description,
      httpServerUrl: this.httpServer.url(),
      name: this.name,
      path: currentPath,
      version: this.version,
    };
  }
}

export default Application;
