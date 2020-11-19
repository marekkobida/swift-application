/*
 * Copyright 2020 Marek Kobida
 */

import net from 'net';
import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';

class Application {
  eventEmitter = new ApplicationEventEmitter();

  httpServer = new ApplicationHttpServer();

  httpServerSockets: Set<net.Socket> = new Set();

  constructor(
    readonly description: string,
    readonly name: string,
    readonly version: string
  ) {
    if (typeof window === 'undefined') {
      this.httpServer.openHttpServer();
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
    return {
      description: this.description,
      htmlFileUrl: this.updateHtmlFileUrl(),
      httpServerUrl: this.httpServer.url(),
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
