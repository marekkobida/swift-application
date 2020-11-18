/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

import Communication from './Communication';

class Application {
  communication = new Communication();

  htmlFileUrl?: string;

  httpServer?: http.Server = this.createHttpServer();

  httpServerSockets: Set<net.Socket> = new Set();

  constructor(
    readonly description: string,
    readonly name: string,
    readonly version: string
  ) {
    this.communication.receiveMessage(async message => {
      if (message.name === 'AFTER_ADD') {
        await this.afterAdd();
      }

      if (message.name === 'DELETE') {
        this.communication.sendMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });

        await this.afterDelete();
      }
    });

    this.communication.sendMessage({
      application: this.toJSON(),
      name: 'ADD',
    });
  }

  async afterAdd() {}

  async afterDelete() {
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
    if (this.htmlFileUrl) {
      const htmlFileUrl = new URL(this.htmlFileUrl);

      const httpServerUrl = this.httpServerUrl();

      if (httpServerUrl) {
        htmlFileUrl.searchParams.set('applicationHttpServerUrl', httpServerUrl);
      }

      return htmlFileUrl.toString();
    }
  }
}

export default Application;
