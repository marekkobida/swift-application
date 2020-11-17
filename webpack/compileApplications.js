"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const createApplicationConfiguration_1 = __importDefault(require("./createApplicationConfiguration"));
async function compileApplications(applications, outputPath) {
    return new Promise(afterCompilation => {
        const configuration = createApplicationConfiguration_1.default(applications, outputPath);
        const compiler = webpack_1.default(configuration);
        compiler.run((error, compilation) => {
            console.log(compilation?.toString({ colors: true }));
            afterCompilation(compilation?.toJson());
        });
    });
}
exports.default = compileApplications;
