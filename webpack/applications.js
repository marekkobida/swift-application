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
function applications([applicationsToCompile, outputPath]) {
    return [
        ...applicationsToCompile
            .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile, './index.ts')))
            .map(applicationToCompile => application_1.default(path_1.default.resolve(applicationToCompile, './index.ts'), './index.js', outputPath(applicationToCompile))),
        ...applicationsToCompile
            .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile, './client.tsx')))
            .map(applicationToCompile => client_1.default(path_1.default.resolve(applicationToCompile, './client.tsx'), './client.js', outputPath(applicationToCompile))),
    ];
}
exports.default = applications;
