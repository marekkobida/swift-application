"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationStorage {
    constructor(configurations = new Map()) {
        this.configurations = configurations;
    }
    add(name, configuration) {
        this.configurations.set(name, configuration);
        return this;
    }
    delete(name) {
        this.configurations.delete(name);
        return this;
    }
    resolve(inputPaths, outputPath) {
        return [...this.configurations].flatMap(([name, configuration]) => {
            return inputPaths.flatMap(inputPath => {
                const resolvedConfiguration = configuration(inputPath, outputPath);
                if (Array.isArray(resolvedConfiguration)) {
                    resolvedConfiguration.forEach((resolvedConfiguration, i) => (resolvedConfiguration.name = `(${i}) ${name}`));
                }
                else {
                    resolvedConfiguration.name = name;
                }
                return resolvedConfiguration;
            });
        });
    }
}
exports.default = ConfigurationStorage;
