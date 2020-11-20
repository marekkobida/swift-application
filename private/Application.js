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
const currentPath = (() => {
    if (typeof window === 'undefined') {
        return new URL(path_1.default.join(__dirname), 'file://').toString();
    }
    const scripts = document.getElementsByTagName('script');
    if (scripts.length > 0) {
        const { src } = scripts[scripts.length - 1];
        return src.substring(0, src.lastIndexOf('/'));
    }
})();
class Application {
    constructor(description, name, version) {
        this.description = description;
        this.name = name;
        this.version = version;
        this.eventEmitter = new ApplicationEventEmitter_1.default();
        this.httpServer = new ApplicationHttpServer_1.default();
        this.isTest = false;
        setInterval(() => {
            if (this.isTest) {
                console.log('vypol si ma vynútene');
                process.exit();
            }
        }, 1000);
    }
    add() {
        this.eventEmitter.emit('AFTER_ADD_APPLICATION', this.toJson());
    }
    close() {
        if (typeof window === 'undefined') {
            this.httpServer.closeHttpServer();
        }
        this.eventEmitter.emit('AFTER_CLOSE_APPLICATION', this.toJson());
    }
    delete() {
        this.close();
        this.eventEmitter.emit('AFTER_DELETE_APPLICATION', this.toJson());
        this.isTest = true;
    }
    open() {
        if (typeof window === 'undefined') {
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
        this.eventEmitter.emit('AFTER_OPEN_APPLICATION', this.toJson());
    }
    toJson() {
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
