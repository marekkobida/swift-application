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
        this.httpServerSockets = new Set();
    }
    closeHttpServer() {
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
    openHttpServer() {
        const httpServer = http_1.default.createServer((request, response) => {
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
    url() {
        if (this.httpServer) {
            const httpServerAddress = this.httpServer.address();
            if (httpServerAddress !== null && typeof httpServerAddress === 'object') {
                return `http://127.0.0.1:${httpServerAddress.port}`;
            }
        }
        throw new Error('The server is not open.');
    }
}
exports.default = ApplicationHttpServer;
