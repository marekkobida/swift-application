"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const createConfiguration_1 = __importDefault(require("./createConfiguration"));
async function compileApplications(applications, outputPath) {
    return new Promise($ => {
        const configuration = createConfiguration_1.default(applications, outputPath);
        if (configuration.length > 0) {
            const compiler = webpack_1.default(configuration);
            compiler.run((error, compilation) => {
                console.log(compilation?.toString({ colors: true }));
                $(applications.map(applicationPath => outputPath(applicationPath)));
            });
            return;
        }
        $(applications);
    });
}
exports.default = compileApplications;
