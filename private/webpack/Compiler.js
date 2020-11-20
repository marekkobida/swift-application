"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const ConfigurationStorage_1 = __importDefault(require("./ConfigurationStorage"));
const applicationClientConfiguration_1 = __importDefault(require("./configurations/applicationClientConfiguration"));
const applicationConfiguration_1 = __importDefault(require("./configurations/applicationConfiguration"));
class Compiler {
    compile(inputPaths, outputPath, configurationStorage = new ConfigurationStorage_1.default()) {
        return new Promise(afterCompilation => {
            const configuration = configurationStorage.resolve(inputPaths, outputPath);
            const compiler = webpack_1.default(configuration);
            compiler.run((error, compilation) => {
                console.log(compilation?.toString({ colors: true }));
                afterCompilation(compilation?.toJson());
            });
        });
    }
    compileApplications(inputPaths, outputPath, configurationStorage = new ConfigurationStorage_1.default()) {
        configurationStorage
            .add(applicationClientConfiguration_1.default)
            .add(applicationConfiguration_1.default);
        return this.compile(inputPaths, outputPath, configurationStorage);
    }
}
exports.default = Compiler;
