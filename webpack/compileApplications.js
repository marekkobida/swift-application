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
const applications_1 = __importDefault(require("./applications"));
async function compileApplications(applicationsToCompile, outputPath) {
    return new Promise(afterCompilation => {
        const compiler = webpack_1.default(applications_1.default(applicationsToCompile, outputPath));
        /* ---------------------------------------------------------------- */
        compiler.run((error, $) => {
            if ($) {
                $.stats.forEach(({ compilation }) => {
                    compilation.emittedAssets.forEach(emittedAsset => console.log(path_1.default.resolve(compilation.compiler.outputPath, emittedAsset)));
                    compilation.errors.forEach(error => console.log(`\x1b[31m${error.message}\x1b[0m`));
                });
                /* ---------------------------------------------------------------- */
                try {
                    applicationsToCompile.forEach(applicationToCompile => fs_1.default.copyFileSync(path_1.default.resolve(applicationToCompile, './client.html'), path_1.default.resolve(outputPath(applicationToCompile), './client.html')));
                }
                catch (error) { }
                /* ---------------------------------------------------------------- */
                afterCompilation();
            }
        });
    });
}
exports.default = compileApplications;
