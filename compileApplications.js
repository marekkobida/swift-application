"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const applications_1 = __importDefault(require("./webpack/applications"));
function compileApplications(applicationsToCompile, outputPath, afterCompilation) {
    if (typeof applicationsToCompile === 'string') {
        applicationsToCompile = [applicationsToCompile];
    }
    const compiler = webpack_1.default(applications_1.default(applicationsToCompile, outputPath));
    compiler.run((error, compilation) => {
        if (compilation) {
            const json = compilation.toJson();
            if (compilation.hasErrors()) {
                json.errors.forEach((error, i) => console.log(`[${i + 1}] \x1b[31m${error.message}\x1b[0m`));
            }
            json.children.forEach((child, i) => child.assets.forEach((asset, ii) => console.log(`[${i + 1}][${ii + 1}] ${path_1.default.resolve(child.outputPath, asset.name)}`)));
            afterCompilation(error, compilation);
        }
    });
}
exports.default = compileApplications;
