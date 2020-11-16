const http = require('http');

class Application {
  constructor(description, htmlFileUrl, name, version) {
    this.description = description;
    this.htmlFileUrl = htmlFileUrl;
    this.name = name;
    this.version = version;
    this.httpServer = this.createHttpServer();
    this.httpServerSockets = new Set();
    /* ---------------------------------------------------------------- */
    process.on('message', serverIPCMessage => {
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

  httpServerUrl() {
    const $ = this.httpServer.address();
    return $ !== null && typeof $ === 'object'
      ? `http://127.0.0.1:${$.port}`
      : this.htmlFileUrl;
  }

  sendIPCMessage(clientIPCMessage) {
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

  updateHtmlFileUrl() {
    const htmlFileUrl = new URL(this.htmlFileUrl);
    htmlFileUrl.searchParams.set('httpServerUrl', this.httpServerUrl());
    return htmlFileUrl.toString();
  }
}

module.exports = Application;
