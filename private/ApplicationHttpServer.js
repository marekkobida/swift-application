"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class ApplicationHttpServer {
    constructor() {
        this.sockets = new Set();
    }
    closeHttpServer() {
        if (this.httpServer) {
            this.httpServer.close();
            this.sockets.forEach(socket => {
                socket.destroy();
                this.sockets.delete(socket);
            });
            return this.httpServer;
        }
        throw new Error('The server is not open.');
    }
    on(event, onRequest) {
        if (this.httpServer) {
            this.httpServer.on(event, onRequest);
        }
    }
    openHttpServer() {
        const httpServer = http_1.default.createServer();
        httpServer.on('connection', socket => {
            this.sockets.add(socket);
            httpServer.once('close', () => this.sockets.delete(socket));
        });
        httpServer.listen();
        this.httpServer = httpServer;
        return httpServer;
    }
    url() {
        if (this.httpServer) {
            const httpServerAddress = this.httpServer.address();
            if (httpServerAddress !== null && typeof httpServerAddress === 'object') {
                return `http://127.0.0.1:${httpServerAddress.port}`;
            }
        }
    }
}
exports.default = ApplicationHttpServer;
