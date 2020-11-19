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

  openHttpServer(): http.Server {
    const httpServer = http.createServer((request, response) => {
      response.setHeader('Access-Control-Allow-Methods', '*');
      response.setHeader('Access-Control-Allow-Origin', '*');
    });

    httpServer.on('connection', socket => {
      this.httpServerSockets.add(socket);

      httpServer.once('close', () => this.httpServerSockets.delete(socket));
    });

    httpServer.listen();

    this.httpServer = httpServer;

    return httpServer;
  }

  url(): string {
    if (this.httpServer) {
      const httpServerAddress = this.httpServer.address();

      if (httpServerAddress !== null && typeof httpServerAddress === 'object') {
        return `http://127.0.0.1:${httpServerAddress.port}`;
      }
    }

    throw new Error('The server is not open.');
  }
}

export default ApplicationHttpServer;
