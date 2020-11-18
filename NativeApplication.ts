/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

import Communication from './Communication';

class NativeApplication {
  httpServer: http.Server;

  httpServerSockets: Set<net.Socket> = new Set();

  constructor(
    readonly description: string,
    readonly htmlFileUrl: string,
    readonly name: string,
    readonly version: string
  ) {
    this.httpServer = this.createHttpServer();

    Communication.receiveMessage(async message => {
      if (message.name === 'AFTER_ADD') {
        await this.afterAdd();
      }

      if (message.name === 'DELETE') {
        Communication.sendMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });

        this.httpServer.close();

        this.httpServerSockets.forEach(socket => {
          socket.destroy();

          this.httpServerSockets.delete(socket);
        });

        await this.afterDelete();

        process.exit();
      }
    });

    Communication.sendMessage({
      application: this.toJSON(),
      name: 'ADD',
    });
  }

  async afterAdd() {}

  async afterDelete() {}

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
