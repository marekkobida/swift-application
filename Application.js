"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ApplicationEventEmitter_1 = __importDefault(require("./ApplicationEventEmitter"));
const ApplicationHttpServer_1 = __importDefault(require("./ApplicationHttpServer"));
class Application {
    constructor(description, name, version) {
        this.description = description;
        this.name = name;
        this.version = version;
        this.eventEmitter = new ApplicationEventEmitter_1.default();
        this.httpServer = new ApplicationHttpServer_1.default();
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
    }
    afterAdd() { }
    afterDelete() {
        if (typeof window === 'undefined') {
            this.httpServer.closeHttpServer();
        }
    }
    open() {
        this.eventEmitter.on('AFTER_ADD', () => this.afterAdd());
        this.eventEmitter.on('DELETE', () => {
            this.afterDelete();
            this.eventEmitter.emit('AFTER_DELETE', this.toJSON());
        });
        this.eventEmitter.emit('ADD', this.toJSON());
    }
    toJSON() {
        if (typeof window === 'undefined') {
            return {
                description: this.description,
                htmlFileUrl: this.updateHtmlFileUrl(),
                httpServerUrl: this.httpServer.url(),
                name: this.name,
                version: this.version,
            };
        }
        return {
            description: this.description,
            name: this.name,
            version: this.version,
        };
    }
    updateHtmlFileUrl() {
        if (typeof window === 'undefined') {
            const htmlFileUrl = new URL(path_1.default.resolve(__dirname, './client.html'), 'file://');
            const httpServerUrl = this.httpServer.url();
            htmlFileUrl.searchParams.set('applicationHttpServerUrl', httpServerUrl);
            return htmlFileUrl.toString();
        }
    }
}
exports.default = Application;
