"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationHttpServer_1 = __importDefault(require("./ApplicationHttpServer"));
class Application {
    constructor(description, name, version) {
        this.description = description;
        this.name = name;
        this.version = version;
        this.httpServer = new ApplicationHttpServer_1.default();
    }
    close() {
        this.httpServer.closeHttpServer();
    }
    delete() {
        this.close();
    }
    open() {
        this.httpServer.openHttpServer();
        this.httpServer.on('request', (request, response) => {
            response.setHeader('Access-Control-Allow-Methods', '*');
            response.setHeader('Access-Control-Allow-Origin', '*');
            if (request.url === '/about') {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(this.toJson()));
            }
        });
    }
    toJson() {
        return {
            description: this.description,
            httpServerUrl: this.httpServer.url(),
            name: this.name,
            version: this.version,
        };
    }
}
exports.default = Application;
