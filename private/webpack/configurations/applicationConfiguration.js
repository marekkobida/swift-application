"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function applicationConfiguration(inputPath, outputPath) {
    return {
        entry: path_1.default.resolve(inputPath, './index.ts'),
        mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-proposal-class-properties'],
                        presets: ['@babel/preset-react', '@babel/preset-typescript'],
                    },
                    test: /\.(js|ts)$/,
                },
            ],
        },
        name: 'application',
        output: {
            filename: 'index.js',
            path: path_1.default.resolve(outputPath, './applications', path_1.default.basename(inputPath)),
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        target: 'node',
    };
}
exports.default = applicationConfiguration;
