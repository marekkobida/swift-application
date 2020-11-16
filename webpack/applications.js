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
const compileApplications_1 = require("../compileApplications");
function applications([applicationsToCompile, outputPath]) {
    return [
        ...applicationsToCompile
            .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile, compileApplications_1.APPLICATION_FILE_NAMES.APPLICATION_TS_FILE_NAME)))
            .map(applicationToCompile => application_1.default(path_1.default.resolve(applicationToCompile, compileApplications_1.APPLICATION_FILE_NAMES.APPLICATION_TS_FILE_NAME), compileApplications_1.APPLICATION_FILE_NAMES.APPLICATION_JS_FILE_NAME, outputPath(applicationToCompile))),
        ...applicationsToCompile
            .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile, compileApplications_1.APPLICATION_FILE_NAMES.APPLICATION_CLIENT_TSX_FILE_NAME)))
            .map(applicationToCompile => client_1.default(path_1.default.resolve(applicationToCompile, compileApplications_1.APPLICATION_FILE_NAMES.APPLICATION_CLIENT_TSX_FILE_NAME), compileApplications_1.APPLICATION_FILE_NAMES.APPLICATION_CLIENT_JS_FILE_NAME, outputPath(applicationToCompile))),
    ];
}
exports.default = applications;
