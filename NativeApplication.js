"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Communication_1 = __importDefault(require("./Communication"));
class NativeApplication {
    constructor(description, htmlFileUrl, name, version) {
        this.description = description;
        this.htmlFileUrl = htmlFileUrl;
        this.name = name;
        this.version = version;
        this.httpServerSockets = new Set();
        this.httpServer = this.createHttpServer();
        Communication_1.default.receiveMessage(async (message) => {
            if (message.name === 'AFTER_ADD') {
                await this.afterAdd();
            }
            if (message.name === 'DELETE') {
                Communication_1.default.sendMessage({
                    application: this.toJSON(),
                    name: 'AFTER_DELETE',
                });
                this.httpServer.close();
                this.httpServerSockets.forEach(socket => {
                    socket.destroy();
                    this.httpServerSockets.delete(socket);
                });
                await this.afterDelete();
                process.exit();
            }
        });
        Communication_1.default.sendMessage({
            application: this.toJSON(),
            name: 'ADD',
        });
    }
    async afterAdd() { }
    async afterDelete() { }
    createHttpServer() {
        const httpServer = http_1.default.createServer((request, response) => {
            response.setHeader('Access-Control-Allow-Methods', '*');
            response.setHeader('Access-Control-Allow-Origin', '*');
            if (request.url === '/about') {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(this.toJSON()));
            }
        });
        httpServer.on('connection', socket => {
            this.httpServerSockets.add(socket);
            httpServer.once('close', () => this.httpServerSockets.delete(socket));
        });
        httpServer.listen();
        return httpServer;
    }
    httpServerUrl() {
        const httpServerAddress = this.httpServer.address();
        return httpServerAddress !== null && typeof httpServerAddress === 'object'
            ? `http://127.0.0.1:${httpServerAddress.port}`
            : 'http://127.0.0.1';
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
        htmlFileUrl.searchParams.set('applicationHttpServerUrl', this.httpServerUrl());
        return htmlFileUrl.toString();
    }
}
exports.default = NativeApplication;
