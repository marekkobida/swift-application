"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function applicationClientConfiguration(inputPath, outputPath) {
    return {
        devtool: 'inline-source-map',
        entry: path_1.default.resolve(inputPath, './client.tsx'),
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
                        plugins: ['@babel/plugin-proposal-class-properties'],
                        presets: ['@babel/preset-react', '@babel/preset-typescript'],
                    },
                    test: /\.(js|ts|tsx)$/,
                },
            ],
        },
        name: 'client',
        output: {
            assetModuleFilename: '[name][ext]',
            filename: 'client.js',
            path: outputPath,
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        },
    };
}
exports.default = applicationClientConfiguration;
