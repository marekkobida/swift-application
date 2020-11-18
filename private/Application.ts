/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';
import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';

class Application {
  eventEmitter = new ApplicationEventEmitter();

  httpServer = this.createHttpServer();

  httpServerSockets: Set<net.Socket> = new Set();

  constructor(
    readonly description: string,
    readonly name: string,
    readonly version: string
  ) {}

  afterAdd() {}

  afterDelete() {
    if (typeof window === 'undefined') {
      this.httpServer?.close();

      this.httpServerSockets.forEach(socket => {
        socket.destroy();

        this.httpServerSockets.delete(socket);
      });
    }
  }

  private createHttpServer() {
    if (typeof window === 'undefined') {
      const httpServer = http.createServer((request, response) => {
        response.setHeader('Access-Control-Allow-Methods', '*');
        response.setHeader('Access-Control-Allow-Origin', '*');

        if (request.url === '/about') {
          response.setHeader('Content-Type', 'application/json');

          response.end(JSON.stringify(this.toJSON()));
        }
      });

      httpServer.on('connection', socket => {
        this.httpServerSockets.add(socket);

        httpServer.once('close', () => this.httpServerSockets.delete(socket));
      });

      httpServer.listen();

      return httpServer;
    }
  }

  private httpServerUrl(): string | undefined {
    const httpServerAddress = this.httpServer?.address();

    return httpServerAddress !== null && typeof httpServerAddress === 'object'
      ? `http://127.0.0.1:${httpServerAddress.port}`
      : undefined;
  }

  open() {
    this.eventEmitter.on('AFTER_ADD', () => {
      this.afterAdd();
    });

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
      httpServerUrl: this.httpServerUrl(),
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

      const httpServerUrl = this.httpServerUrl();

      if (httpServerUrl) {
        htmlFileUrl.searchParams.set('applicationHttpServerUrl', httpServerUrl);
      }

      return htmlFileUrl.toString();
    }
  }
}

export default Application;
