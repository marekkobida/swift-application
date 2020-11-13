/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';
import net from 'net';

import Application from './Application';

class TestApplication extends Application {
  server?: http.Server;

  sockets: Set<net.Socket> = new Set();

  constructor() {
    super(
      'Testovacia aplikácia, ktorá po pridaní vytvorí HTTP server.',
      'http://127.0.0.1:8080',
      'TestApplication',
      '1.0.0',
    );
  }

  afterAdd() {
    const server = http.createServer((request, response) => {
      response.setHeader('Content-Type', 'application/json');

      return response.end(JSON.stringify(this.toJSON()));
    });

    /* ---------------------------------------------------------------- */

    server.listen(8080);

    /* ---------------------------------------------------------------- */

    server.on('connection', socket => {
      this.sockets.add(socket);

      server.once('close', () => this.sockets.delete(socket));
    });

    /* ---------------------------------------------------------------- */

    this.server = server;
  }

  afterDelete() {
    this.sockets.forEach(socket => {
      socket.destroy();

      this.sockets.delete(socket);
    });

    /* ---------------------------------------------------------------- */

    this.server?.close();
  }
}

export default TestApplication;
