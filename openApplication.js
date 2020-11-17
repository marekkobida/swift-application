#!/usr/bin/env node
"use strict";
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
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const compileApplications_1 = __importDefault(require("./webpack/compileApplications"));
const applicationToCompilePath = process.argv[2];
if (fs_1.default.existsSync(path_1.default.resolve(applicationToCompilePath, './index.js'))) {
    Promise.resolve().then(() => __importStar(require(path_1.default.resolve(applicationToCompilePath, './index.js')))).then(application => new application());
}
if (fs_1.default.existsSync(path_1.default.resolve(applicationToCompilePath, './index.ts'))) {
    const outputPath = path_1.default.resolve(os_1.default.tmpdir(), './applications', path_1.default.basename(applicationToCompilePath));
    compileApplications_1.default([{ path: applicationToCompilePath }], () => outputPath)
        .then(() => Promise.resolve().then(() => __importStar(require(path_1.default.resolve(outputPath, './index.js')))))
        .then(application => new application());
}
