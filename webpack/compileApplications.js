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
const webpack_1 = __importDefault(require("webpack"));
const application_1 = __importDefault(require("./application"));
const client_1 = __importDefault(require("./client"));
async function compileApplications(applicationsToCompile, outputPath) {
    return new Promise(afterCompilation => {
        const compiler = webpack_1.default([
            ...applicationsToCompile
                .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile.path, './client.tsx')))
                .map(applicationToCompile => client_1.default(path_1.default.resolve(applicationToCompile.path, './client.tsx'), './client.js', outputPath(applicationToCompile))),
            ...applicationsToCompile
                .filter(applicationToCompile => fs_1.default.existsSync(path_1.default.resolve(applicationToCompile.path, './index.ts')))
                .map(applicationToCompile => application_1.default(path_1.default.resolve(applicationToCompile.path, './index.ts'), './index.js', outputPath(applicationToCompile))),
        ]);
        compiler.run((...parameters) => {
            console.log(parameters[1]?.toString({ colors: true }));
            afterCompilation();
        });
    });
}
exports.default = compileApplications;
