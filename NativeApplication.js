"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class NativeApplication {
    constructor(description, htmlFileUrl, name, version) {
        this.description = description;
        this.htmlFileUrl = htmlFileUrl;
        this.name = name;
        this.version = version;
        this.httpServerSockets = new Set();
        this.httpServer = this.createHttpServer();
        /* ---------------------------------------------------------------- */
        process.on('message', (serverIPCMessage) => {
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
    afterAdd() { }
    afterDelete() { }
    createHttpServer() {
        const httpServer = http_1.default.createServer((request, response) => {
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
exports.default = NativeApplication;
