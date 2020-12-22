/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

class ApplicationHttpServer {
  private httpServer?: http.Server;

  private readonly sockets: Set<net.Socket> = new Set();

  closeHttpServer(): http.Server | undefined {
    console.log('ApplicationHttpServer.closeHttpServer');

    if (this.httpServer) {
      this.httpServer.close();

      this.sockets.forEach(socket => {
        socket.destroy();

        this.sockets.delete(socket);
      });

      return this.httpServer;
    }
  }

  on(
    event: 'request',
    onRequest: (
      request: http.IncomingMessage,
      response: http.ServerResponse
    ) => void
  ) {
    console.log('ApplicationHttpServer.on');

    if (this.httpServer) {
      this.httpServer.on(event, onRequest);
    }
  }

  openHttpServer(): http.Server {
    console.log('ApplicationHttpServer.openHttpServer');

    const httpServer = http.createServer();

    httpServer.on('connection', socket => {
      this.sockets.add(socket);

      httpServer.once('close', () => this.sockets.delete(socket));
    });

    httpServer.listen();

    this.httpServer = httpServer;

    return httpServer;
  }

  url(): string | undefined {
    console.log('ApplicationHttpServer.url');

    if (this.httpServer) {
      const httpServerAddress = this.httpServer.address();

      if (httpServerAddress !== null && typeof httpServerAddress === 'object') {
        return `http://127.0.0.1:${httpServerAddress.port}`;
      }
    }
  }
}

export default ApplicationHttpServer;
