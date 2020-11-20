"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
class ApplicationStorage {
    constructor() {
        this.applicationStorage = new Map();
    }
    addApplication(path) {
        if (this.applicationStorage.has(path)) {
            return this.toJson();
        }
        const test = child_process_1.default.fork('./node_modules/.bin/open-application', [
            path,
        ]);
        process.on('message', message => {
            if (message.name === 'ADD_APPLICATION') {
                this.applicationStorage.set(path, {
                    application: message.application,
                    test,
                });
                test.send({ name: 'AFTER_ADD_APPLICATION' });
            }
            if (message.name === 'AFTER_DELETE_APPLICATION') {
                this.applicationStorage.delete(path);
            }
        });
        return this.toJson();
    }
    deleteApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.test.send({ name: 'DELETE_APPLICATION' });
        }
        return this.toJson();
    }
    deleteApplications() {
        this.applicationStorage.forEach(application => application.test.send({ name: 'DELETE_APPLICATION' }));
        return this.toJson();
    }
    readApplications() {
        return this.toJson();
    }
    toJson() {
        return [...this.applicationStorage].map(([path, { application }]) => [
            path,
            application,
        ]);
    }
}
exports.default = ApplicationStorage;
