"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ApplicationHttpServer_1 = __importDefault(require("./ApplicationHttpServer"));
class Application {
    constructor(description, name, version) {
        this.description = description;
        this.name = name;
        this.version = version;
        this.httpServer = new ApplicationHttpServer_1.default();
    }
    close() {
        console.log('Application.close');
        this.httpServer.closeHttpServer();
    }
    delete() {
        console.log('Application.delete');
        this.close();
    }
    open() {
        console.log('Application.open');
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
        console.log('Application.toJson');
        return {
            description: this.description,
            httpServerUrl: this.httpServer.url(),
            name: this.name,
            path: new URL(path_1.default.join(__dirname), 'file://').toString(),
            version: this.version,
        };
    }
}
exports.default = Application;
