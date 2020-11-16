"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function client(inputFilePath, outputFileName, outputPath) {
    return {
        devtool: 'inline-source-map',
        entry: inputFilePath,
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(css|html)$/,
                    type: 'asset/resource',
                },
                {
                    loader: 'babel-loader',
                    options: {
                        configFile: path_1.default.resolve(__dirname, '../../babel.config.js'),
                    },
                    test: /\.(js|ts|tsx)$/,
                },
            ],
        },
        output: {
            assetModuleFilename: '[name][ext]',
            filename: outputFileName,
            path: outputPath,
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        },
    };
}
exports.default = client;
