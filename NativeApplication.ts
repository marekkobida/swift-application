/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

export interface ClientIPCMessage {
  application: ReturnType<NativeApplication['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE';
}

export interface ServerIPCMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

class NativeApplication {
  httpServer: http.Server;

  httpServerSockets: Set<net.Socket> = new Set();

  constructor(
    readonly description: string,
    readonly htmlFileUrl: string,
    readonly name: string,
    readonly version: string,
  ) {
    this.httpServer = this.createHttpServer();

    /* ---------------------------------------------------------------- */

    process.on('message', (serverIPCMessage: ServerIPCMessage) => {
      if (serverIPCMessage.name === 'AFTER_ADD') {
        this.afterAdd();
      }

      if (serverIPCMessage.name === 'DELETE') {
        this.sendIPCMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });

        /* ---------------------------------------------------------------- */

        this.httpServer.close();

        /* ---------------------------------------------------------------- */

        this.httpServerSockets.forEach(socket => {
          socket.destroy();

          this.httpServerSockets.delete(socket);
        });

        /* ---------------------------------------------------------------- */

        this.afterDelete();
      }
    });

    /* ---------------------------------------------------------------- */

    this.sendIPCMessage({
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

    /* ---------------------------------------------------------------- */

    httpServer.on('connection', socket => {
      this.httpServerSockets.add(socket);

      httpServer.once('close', () => this.httpServerSockets.delete(socket));
    });

    /* ---------------------------------------------------------------- */

    httpServer.listen();

    /* ---------------------------------------------------------------- */

    return httpServer;
  }

  private httpServerUrl(): string {
    const $ = this.httpServer.address();

    return $ !== null && typeof $ === 'object'
      ? `http://127.0.0.1:${$.port}`
      : this.htmlFileUrl;
  }

  sendIPCMessage(clientIPCMessage: ClientIPCMessage) {
    process.send?.(clientIPCMessage);
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
