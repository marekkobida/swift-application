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
async function compileApplications(applications, outputPath) {
    return new Promise($ => {
        const configuration = [
            ...applications
                .filter(applicationToCompile => {
                return fs_1.default.existsSync(path_1.default.resolve(applicationToCompile.path, './client.tsx'));
            })
                .map(applicationToCompile => {
                return client_1.default(path_1.default.resolve(applicationToCompile.path, './client.tsx'), 'client.js', outputPath(applicationToCompile));
            }),
            ...applications
                .filter(applicationToCompile => {
                return fs_1.default.existsSync(path_1.default.resolve(applicationToCompile.path, './index.ts'));
            })
                .map(applicationToCompile => {
                return application_1.default(path_1.default.resolve(applicationToCompile.path, './index.ts'), 'index.js', outputPath(applicationToCompile));
            }),
        ];
        if (configuration.length > 0) {
            const compiler = webpack_1.default(configuration);
            compiler.run((error, compilation) => {
                console.log(compilation?.toString({ colors: true }));
                $(applications.map(applicationToCompile => {
                    applicationToCompile.path = outputPath(applicationToCompile);
                    return applicationToCompile;
                }));
            });
            return;
        }
        $(applications);
    });
}
exports.default = compileApplications;
