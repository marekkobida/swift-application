/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';

class Application {
  eventEmitter = new ApplicationEventEmitter();

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

  afterDelete() {
    if (typeof window === 'undefined') {
      this.httpServer.closeHttpServer();
    }
  }

  open() {
    this.eventEmitter.on('AFTER_ADD', () => this.afterAdd());

    this.eventEmitter.on('DELETE', () => {
      this.afterDelete();

      this.eventEmitter.emit('AFTER_DELETE', this.toJSON());
    });

    this.eventEmitter.emit('ADD', this.toJSON());
  }

  toJSON() {
    if (typeof window === 'undefined') {
      return {
        description: this.description,
        htmlFileUrl: this.updateHtmlFileUrl(),
        httpServerUrl: this.httpServer.url(),
        name: this.name,
        version: this.version,
      };
    }

    return {
      description: this.description,
      name: this.name,
      version: this.version,
    };
  }

  private updateHtmlFileUrl(): string | undefined {
    if (typeof window === 'undefined') {
      const htmlFileUrl = new URL(
        path.resolve(__dirname, './client.html'),
        'file://'
      );

      const httpServerUrl = this.httpServer.url();

      htmlFileUrl.searchParams.set('applicationHttpServerUrl', httpServerUrl);

      return htmlFileUrl.toString();
    }
  }
}

export default Application;
