"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicationClientConfiguration_1 = __importDefault(require("./applicationClientConfiguration"));
const applicationConfiguration_1 = __importDefault(require("./applicationConfiguration"));
function createApplicationConfiguration(applications, outputPath) {
    const configurations = [applicationClientConfiguration_1.default, applicationConfiguration_1.default];
    return configurations.flatMap(configuration => applications.map(applicationPath => configuration(applicationPath, outputPath(applicationPath))));
}
exports.default = createApplicationConfiguration;
