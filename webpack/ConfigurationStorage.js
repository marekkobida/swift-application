"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationStorage {
    constructor(configurations = new Set()) {
        this.configurations = configurations;
    }
    add(configuration) {
        this.configurations.add(configuration);
        return this;
    }
    resolve(inputPaths, outputPath) {
        return [...this.configurations].flatMap(configuration => {
            return inputPaths.flatMap(inputPath => {
                return configuration(inputPath, outputPath);
            });
        });
    }
}
exports.default = ConfigurationStorage;
