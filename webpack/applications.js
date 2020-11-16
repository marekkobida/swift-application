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
const package_json_1 = require("../package.json");
function applications([applicationsToCompile, outputPath]) {
    return [
        ...applicationsToCompile
            .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile, package_json_1.APPLICATION_TS_FILE_NAME)))
            .map(applicationToCompile => application_1.default(path_1.default.resolve(applicationToCompile, package_json_1.APPLICATION_TS_FILE_NAME), package_json_1.APPLICATION_JS_FILE_NAME, outputPath(applicationToCompile))),
        ...applicationsToCompile
            .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile, package_json_1.APPLICATION_CLIENT_TSX_FILE_NAME)))
            .map(applicationToCompile => client_1.default(path_1.default.resolve(applicationToCompile, package_json_1.APPLICATION_CLIENT_TSX_FILE_NAME), package_json_1.APPLICATION_CLIENT_JS_FILE_NAME, outputPath(applicationToCompile))),
    ];
}
exports.default = applications;
