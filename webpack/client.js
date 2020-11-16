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
                    test: /\.css$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(js|ts|tsx)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: ['@babel/plugin-proposal-class-properties'],
                                presets: ['@babel/preset-react', '@babel/preset-typescript'],
                            },
                        },
                    ],
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
        snapshot: {
            managedPaths: [],
        },
    };
}
exports.default = client;
