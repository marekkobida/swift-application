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
        test.on('message', ([event, application]) => {
            if (event === 'ADD_APPLICATION_TO_STORAGE') {
                this.applicationStorage.set(path, { application, test });
            }
            if (event === 'AFTER_CLOSE_APPLICATION') {
                this.applicationStorage.set(path, { application, test });
            }
            if (event === 'AFTER_DELETE_APPLICATION') {
                this.applicationStorage.delete(path);
            }
            if (event === 'AFTER_OPEN_APPLICATION') {
                this.applicationStorage.set(path, { application, test });
            }
        });
        return this.toJson();
    }
    closeApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.test.send(['CLOSE_APPLICATION']);
        }
        return this.toJson();
    }
    deleteApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.test.send(['DELETE_APPLICATION']);
        }
        return this.toJson();
    }
    deleteApplications() {
        this.applicationStorage.forEach(application => application.test.send(['DELETE_APPLICATION']));
        return this.toJson();
    }
    openApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.test.send(['OPEN_APPLICATION']);
        }
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
