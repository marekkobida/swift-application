"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const applicationClientConfiguration_1 = __importDefault(require("./applicationClientConfiguration"));
const applicationConfiguration_1 = __importDefault(require("./applicationConfiguration"));
function createApplicationConfiguration(applications, outputPath) {
    const configurations = [applicationClientConfiguration_1.default, applicationConfiguration_1.default];
    return configurations.flatMap(configuration => applications.map(applicationPath => configuration(applicationPath, path_1.default.resolve(outputPath, './applications', path_1.default.basename(applicationPath)))));
}
exports.default = createApplicationConfiguration;
