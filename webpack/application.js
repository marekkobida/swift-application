"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function application(inputFilePath, outputFileName, outputPath) {
    return {
        devtool: 'inline-source-map',
        entry: inputFilePath,
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                configFile: path_1.default.resolve(__dirname, '../babel.config.js'),
                            },
                        },
                    ],
                },
            ],
        },
        output: {
            filename: outputFileName,
            libraryTarget: 'commonjs',
            path: outputPath,
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        snapshot: {
            managedPaths: [],
        },
        target: 'node',
    };
}
exports.default = application;
