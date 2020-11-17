"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
            filename: outputFileName,
            path: outputPath,
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        },
    };
}
exports.default = client;
