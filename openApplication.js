#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const compileApplications_1 = __importDefault(require("./webpack/compileApplications"));
async function openApplication() {
    let applicationToCompilePath = process.argv[2];
    if (fs_1.default.existsSync(path_1.default.resolve(applicationToCompilePath, './index.ts'))) {
        const outputPath = path_1.default.resolve(os_1.default.tmpdir(), './applications', path_1.default.basename(applicationToCompilePath));
        await compileApplications_1.default([{ path: applicationToCompilePath }], () => outputPath);
        applicationToCompilePath = outputPath;
    }
    let application = require(path_1.default.resolve(applicationToCompilePath, './index.js')).default;
    new application();
}
openApplication();
