/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

export interface ClientMessage {
  application?: ReturnType<NativeApplication['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE' | 'ERROR';
}

export interface ServerMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

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

    NativeApplication.receiveMessage(message => {
      if (message.name === 'AFTER_ADD') {
        this.afterAdd();
      }

      if (message.name === 'DELETE') {
        NativeApplication.sendMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });

        this.httpServer.close();

        this.httpServerSockets.forEach(socket => {
          socket.destroy();

          this.httpServerSockets.delete(socket);
        });

        this.afterDelete();
      }
    });

    NativeApplication.sendMessage({
      application: this.toJSON(),
      name: 'ADD',
    });
  }

  afterAdd() {}

  afterDelete() {}

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

  static receiveMessage(receiveMessage: (message: ServerMessage) => void) {
    process.on('message', receiveMessage);
  }

  static sendMessage(message: ClientMessage) {
    process.send?.(message);
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

    htmlFileUrl.searchParams.set('httpServerUrl', this.httpServerUrl());

    return htmlFileUrl.toString();
  }
}

export default NativeApplication;
