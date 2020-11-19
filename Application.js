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
const currentPath = (() => {
    if (typeof window === 'undefined') {
        return new URL(path_1.default.join(__dirname), 'file://').toString();
    }
    const scripts = document.getElementsByTagName('script');
    const src = scripts[scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf('/'));
})();
class Application {
    constructor(description, name, version) {
        this.description = description;
        this.name = name;
        this.version = version;
        this.httpServer = new ApplicationHttpServer_1.default();
    }
    afterAdd() { }
    afterDelete() { }
    open(eventEmitter) {
        if (typeof window === 'undefined') {
            this.httpServer.openHttpServer();
            this.httpServer.on('request', (request, response) => {
                response.setHeader('Access-Control-Allow-Methods', '*');
                response.setHeader('Access-Control-Allow-Origin', '*');
                if (request.url === '/about') {
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(this.toJSON()));
                }
            });
        }
        eventEmitter.on('AFTER_ADD', () => this.afterAdd());
        eventEmitter.on('DELETE', () => {
            if (typeof window === 'undefined') {
                this.httpServer.closeHttpServer();
            }
            this.afterDelete();
            eventEmitter.emit('AFTER_DELETE', this.toJSON());
        });
        eventEmitter.emit('ADD', this.toJSON());
    }
    toJSON() {
        return {
            description: this.description,
            httpServerUrl: this.httpServer.url(),
            name: this.name,
            path: currentPath,
            version: this.version,
        };
    }
}
exports.default = Application;
