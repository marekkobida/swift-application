"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Application_1 = __importDefault(require("./Application"));
class TestApplication extends Application_1.default {
    constructor() {
        super('Testovacia aplikácia, ktorá po pridaní vytvorí HTTP server.', 'http://127.0.0.1:8080', 'TestApplication', '1.0.0');
        this.sockets = new Set();
    }
    afterAdd() {
        const server = http_1.default.createServer((request, response) => {
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
exports.default = TestApplication;
