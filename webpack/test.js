"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class ApplicationConfiguration {
    constructor(configurations) {
        this.configurations = configurations;
    }
    addConfiguration(configuration) {
        this.configurations = [...this.configurations, configuration];
    }
    test(inputPaths, outputPath) {
        return this.configurations.flatMap(configuration => {
            return inputPaths.map(inputPath => {
                return configuration(inputPath, path_1.default.resolve(outputPath, './applications', path_1.default.basename(inputPath)));
            });
        });
    }
}
exports.default = ApplicationConfiguration;
