/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

import Application from './Application';

class NativeApplication extends Application {
  httpServer: http.Server;

  httpServerSockets: Set<net.Socket> = new Set();

  constructor(
    readonly description: string,
    readonly htmlFileUrl: string,
    readonly name: string,
    readonly version: string
  ) {
    super(description, htmlFileUrl, name, version);

    this.httpServer = this.createHttpServer();

    this.add();
  }

  async afterAdd() {}

  async afterDelete() {
    this.httpServer.close();

    this.httpServerSockets.forEach(socket => {
      socket.destroy();

      this.httpServerSockets.delete(socket);
    });
  }

  private createHttpServer() {
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

  private httpServerUrl(): string {
    const httpServerAddress = this.httpServer.address();

    return httpServerAddress !== null && typeof httpServerAddress === 'object'
      ? `http://127.0.0.1:${httpServerAddress.port}`
      : 'http://127.0.0.1';
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

  private updateHtmlFileUrl(): string {
    const htmlFileUrl = new URL(this.htmlFileUrl);

    htmlFileUrl.searchParams.set(
      'applicationHttpServerUrl',
      this.httpServerUrl()
    );

    return htmlFileUrl.toString();
  }
}

export default NativeApplication;
