/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

export interface ClientIPCMessage {
  application: ReturnType<Application['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE';
}

export interface ServerIPCMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

class Application {
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
        this.afterDelete();

        /* ---------------------------------------------------------------- */

        this.sendIPCMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });

        /* ---------------------------------------------------------------- */

        this.httpServerSockets.forEach(socket => {
          socket.destroy();

          this.httpServerSockets.delete(socket);
        });

        /* ---------------------------------------------------------------- */

        this.httpServer.close();
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

  createHttpServer() {
    const httpServer = http.createServer();

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

  httpServerUrl(): string {
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

  updateHtmlFileUrl(): string {
    const htmlFileUrl = new URL(this.htmlFileUrl);

    htmlFileUrl.searchParams.set('httpServerUrl', this.httpServerUrl());

    return htmlFileUrl.toString();
  }
}

export default Application;
