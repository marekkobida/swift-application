"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class Application {
    constructor(description, htmlFileUrl, name, version) {
        this.description = description;
        this.htmlFileUrl = htmlFileUrl;
        this.name = name;
        this.version = version;
        this.httpServerSockets = new Set();
        const httpServer = http_1.default.createServer();
        /* ---------------------------------------------------------------- */
        httpServer.on('connection', socket => {
            this.httpServerSockets.add(socket);
            httpServer.once('close', () => this.httpServerSockets.delete(socket));
        });
        /* ---------------------------------------------------------------- */
        this.httpServer = httpServer;
        /* ---------------------------------------------------------------- */
        process.on('message', (serverIPCMessage) => {
            if (serverIPCMessage.name === 'AFTER_ADD') {
                this.afterAdd();
            }
            if (serverIPCMessage.name === 'DELETE') {
                this.afterDelete();
            }
        });
        /* ---------------------------------------------------------------- */
        this.httpServer.listen();
        /* ---------------------------------------------------------------- */
        this.sendIPCMessage({
            application: this.toJSON(),
            name: 'ADD',
        });
    }
    afterAdd() { }
    afterDelete() {
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
exports.default = Application;
