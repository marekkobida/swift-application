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
class Application {
    constructor(description, name, version) {
        this.description = description;
        this.name = name;
        this.version = version;
        this.communication = new Communication_1.default();
        this.httpServer = this.createHttpServer();
        this.httpServerSockets = new Set();
        this.communication.receiveMessage(async (message) => {
            if (message.name === 'AFTER_ADD') {
                await this.afterAdd();
            }
            if (message.name === 'DELETE') {
                this.communication.sendMessage({
                    application: this.toJSON(),
                    name: 'AFTER_DELETE',
                });
                await this.afterDelete();
            }
        });
        this.communication.sendMessage({
            application: this.toJSON(),
            name: 'ADD',
        });
    }
    async afterAdd() { }
    async afterDelete() {
        if (typeof window === 'undefined') {
            this.httpServer?.close();
            this.httpServerSockets.forEach(socket => {
                socket.destroy();
                this.httpServerSockets.delete(socket);
            });
        }
    }
    createHttpServer() {
        if (typeof window === 'undefined') {
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
    }
    httpServerUrl() {
        const httpServerAddress = this.httpServer?.address();
        return httpServerAddress !== null && typeof httpServerAddress === 'object'
            ? `http://127.0.0.1:${httpServerAddress.port}`
            : undefined;
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
        if (this.htmlFileUrl) {
            const htmlFileUrl = new URL(this.htmlFileUrl);
            const httpServerUrl = this.httpServerUrl();
            if (httpServerUrl) {
                htmlFileUrl.searchParams.set('applicationHttpServerUrl', httpServerUrl);
            }
            return htmlFileUrl.toString();
        }
    }
}
exports.default = Application;
