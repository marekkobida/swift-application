"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
                                plugins: ['@babel/plugin-proposal-class-properties'],
                                presets: ['@babel/preset-react', '@babel/preset-typescript'],
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
        target: 'node',
    };
}
exports.default = application;
