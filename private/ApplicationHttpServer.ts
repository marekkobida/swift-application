/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

class ApplicationHttpServer {
  private httpServer?: http.Server;

  private httpServerSockets: Set<net.Socket> = new Set();

  closeHttpServer(): http.Server {
    if (this.httpServer) {
      this.httpServer.close();

      this.httpServerSockets.forEach(socket => {
        socket.destroy();

        this.httpServerSockets.delete(socket);
      });

      return this.httpServer;
    }

    throw new Error('The server is not open.');
  }

  on(
    event: 'request',
    onRequest: (
      request: http.IncomingMessage,
      response: http.ServerResponse
    ) => void
  ) {
    if (this.httpServer) {
      this.httpServer.on(event, onRequest);
    }
  }

  openHttpServer(): http.Server {
    const httpServer = http.createServer();

    httpServer.on('connection', socket => {
      this.httpServerSockets.add(socket);

      httpServer.once('close', () => this.httpServerSockets.delete(socket));
    });

    httpServer.listen();

    this.httpServer = httpServer;

    return httpServer;
  }

  url(): string | undefined {
    if (this.httpServer) {
      const httpServerAddress = this.httpServer.address();

      if (httpServerAddress !== null && typeof httpServerAddress === 'object') {
        return `http://127.0.0.1:${httpServerAddress.port}`;
      }
    }
  }
}

export default ApplicationHttpServer;
