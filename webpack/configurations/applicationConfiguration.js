"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
function applicationConfiguration(inputPath, outputPath) {
    return {
        entry: path_1.default.resolve(inputPath, './index.ts'),
        externals: ['http', 'net'],
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
            library: {
                export: 'default',
                name: ['applications', path_1.default.basename(inputPath)],
                type: 'umd',
            },
            path: path_1.default.resolve(outputPath, './applications', path_1.default.basename(inputPath)),
        },
        plugins: [
            new webpack_1.default.DefinePlugin({
                OUTPUT_PATH: JSON.stringify(path_1.default.resolve(outputPath, './applications', path_1.default.basename(inputPath))),
            }),
        ],
        resolve: {
            extensions: ['.js', '.ts'],
        },
    };
}
exports.default = applicationConfiguration;
