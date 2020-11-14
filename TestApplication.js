"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Application_1 = __importDefault(require("./Application"));
class TestApplication extends Application_1.default {
    constructor() {
        super('Testovacia aplikácia, ktorá po pridaní vytvorí HTTP server.', `file://${path_1.default.resolve(__dirname, './TestApplication.html')}`, 'TestApplication', '1.0.0');
    }
    afterAdd() {
        super.afterAdd();
        this.httpServer.on('request', (request, response) => {
            response.setHeader('Content-Type', 'application/json');
            return response.end(JSON.stringify(this.toJSON()));
        });
    }
}
exports.default = TestApplication;
