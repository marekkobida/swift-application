/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';

const currentPath: string | undefined = (() => {
  if (typeof window === 'undefined') {
    return new URL(path.join(__dirname), 'file://').toString();
  }

  const scripts = document.getElementsByTagName('script');

  if (scripts.length > 0) {
    const { src } = scripts[scripts.length - 1];

    return src.substring(0, src.lastIndexOf('/'));
  }
})();

class Application {
  readonly eventEmitter = new ApplicationEventEmitter();

  readonly httpServer = new ApplicationHttpServer();

  constructor(
    readonly description: string,
    readonly name: string,
    readonly version: string
  ) {
    console.log('Application', description, name, version);
  }

  afterAdd() {
    console.log('Application.afterAdd');
  }

  afterDelete() {
    console.log('Application.afterDelete');
  }

  open() {
    console.log('Application.open');

    if (typeof window === 'undefined') {
      this.httpServer.openHttpServer();

      this.httpServer.on('request', (request, response) => {
        response.setHeader('Access-Control-Allow-Methods', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        if (request.url === '/about') {
          response.setHeader('Content-Type', 'application/json');

          response.end(JSON.stringify(this.toJson()));
        }
      });
    }

    this.eventEmitter.on('AFTER_ADD_APPLICATION', () => this.afterAdd());

    this.eventEmitter.on('DELETE_APPLICATION', () => {
      if (typeof window === 'undefined') {
        this.httpServer.closeHttpServer();
      }

      this.afterDelete();

      this.eventEmitter.emit('AFTER_DELETE_APPLICATION', this.toJson());
    });

    this.eventEmitter.emit('ADD_APPLICATION', this.toJson());
  }

  toJson() {
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
