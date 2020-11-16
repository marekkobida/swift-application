#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const compileApplications_1 = __importDefault(require("./compileApplications"));
const APPLICATION_PATH = process.argv[2];
const APPLICATION_NAME = path_1.default.basename(APPLICATION_PATH);
const APPLICATION_TS_FILE_PATH = path_1.default.resolve(APPLICATION_PATH, './index.ts');
const OUTPUT_PATH = path_1.default.resolve(os_1.default.tmpdir(), './applications', APPLICATION_NAME);
async function openApplication() {
    if (path_1.default.isAbsolute(APPLICATION_PATH)) {
        if (fs_1.default.existsSync(APPLICATION_TS_FILE_PATH)) {
            await compileApplications_1.default([APPLICATION_PATH], () => OUTPUT_PATH);
            let application = require(path_1.default.resolve(OUTPUT_PATH, './index.js'))
                .default;
            new application();
            return;
        }
        let application = require(path_1.default.resolve(APPLICATION_PATH, './index.js'))
            .default;
        new application();
        return;
    }
    throw new Error(`The application path "${APPLICATION_PATH}" is not absolute.`);
}
openApplication();
