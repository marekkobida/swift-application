"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const application_1 = __importDefault(require("./application"));
const client_1 = __importDefault(require("./client"));
function createConfiguration(applications, outputPath) {
    return [
        ...applications
            .filter(applicationPath => {
            return fs_1.default.existsSync(path_1.default.resolve(applicationPath, './client.tsx'));
        })
            .map(applicationPath => {
            return client_1.default(path_1.default.resolve(applicationPath, './client.tsx'), 'client.js', outputPath(applicationPath));
        }),
        ...applications
            .filter(applicationPath => {
            return fs_1.default.existsSync(path_1.default.resolve(applicationPath, './index.ts'));
        })
            .map(applicationPath => {
            return application_1.default(path_1.default.resolve(applicationPath, './index.ts'), 'index.js', outputPath(applicationPath));
        }),
    ];
}
exports.default = createConfiguration;
