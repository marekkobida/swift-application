/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

class ApplicationHttpServer {
  private httpServer?: http.Server;

  private readonly sockets: Set<net.Socket> = new Set();

  closeHttpServer(): http.Server | undefined {
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
    if (this.httpServer) {
      this.httpServer.on(event, onRequest);
    }
  }

  openHttpServer(): http.Server {
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
    if (this.httpServer) {
      const httpServerAddress = this.httpServer.address() as { port: number };

      return `http://0.0.0.0:${httpServerAddress.port}`;
    }
  }
}

export default ApplicationHttpServer;
