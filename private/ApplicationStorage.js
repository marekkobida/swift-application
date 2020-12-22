"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Compiler_1 = __importDefault(require("./webpack/Compiler"));
class ApplicationStorage {
    constructor() {
        this.applicationStorage = new Map();
    }
    async addApplication(path) {
        if (this.applicationStorage.has(path)) {
            return this.toJson();
        }
        const { children: [{ outputPath }], } = await new Compiler_1.default().compileApplications([path], '/Users/marekkobida/Documents/test');
        const $ = await Promise.resolve().then(() => __importStar(require(`${outputPath}/index.js`)));
        if (typeof $.default === 'function') {
            const application = new $.default();
            this.applicationStorage.set(path, application);
        }
        return this.toJson();
    }
    closeApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.close();
        }
        return this.toJson();
    }
    deleteApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.delete();
        }
        return this.toJson();
    }
    deleteApplications() {
        this.applicationStorage.forEach(application => application.delete());
        return this.toJson();
    }
    openApplication(path) {
        const application = this.applicationStorage.get(path);
        if (application) {
            application.open();
        }
        return this.toJson();
    }
    readApplication(path) {
        return this.toJson(new Map([...this.applicationStorage].filter($ => $[0] === path)));
    }
    readApplications() {
        return this.toJson();
    }
    toJson(applicationStorage = this
        .applicationStorage) {
        return [...applicationStorage].map(([path, application]) => [
            path,
            application.toJson(),
        ]);
    }
}
exports.default = ApplicationStorage;
