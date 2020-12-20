"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationStorage {
    constructor(configurationStorage = new Set()) {
        this.configurationStorage = configurationStorage;
    }
    addConfiguration(configuration) {
        this.configurationStorage.add(configuration);
        return this;
    }
    resolve(inputPaths, outputPath) {
        return [...this.configurationStorage].flatMap(configuration => {
            return inputPaths.flatMap(inputPath => {
                return configuration(inputPath, outputPath);
            });
        });
    }
}
exports.default = ConfigurationStorage;
