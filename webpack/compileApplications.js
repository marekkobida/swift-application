"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const test_1 = __importDefault(require("./test"));
const applicationClientConfiguration_1 = __importDefault(require("./applicationClientConfiguration"));
const applicationConfiguration_1 = __importDefault(require("./applicationConfiguration"));
const test = new test_1.default([applicationClientConfiguration_1.default, applicationConfiguration_1.default]);
function compileApplications(applications, outputPath) {
    return new Promise(afterCompilation => {
        const configuration = test.test(applications, outputPath);
        const compiler = webpack_1.default(configuration);
        compiler.run((error, compilation) => {
            console.log(compilation?.toString({ colors: true }));
            afterCompilation(compilation?.toJson());
        });
    });
}
exports.default = compileApplications;
