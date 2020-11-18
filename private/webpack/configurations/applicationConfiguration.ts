/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

function applicationConfiguration(
  inputPath: string,
  outputPath: string
): webpack.Configuration {
  return {
    entry: path.resolve(inputPath, './index.ts'),
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
      globalObject: 'this',
      libraryTarget: 'umd',
      path: path.resolve(
        outputPath,
        './applications',
        path.basename(inputPath)
      ),
    },
    plugins: [
      new webpack.DefinePlugin({
        OUTPUT_PATH: JSON.stringify(
          path.resolve(outputPath, './applications', path.basename(inputPath))
        ),
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts'],
    },
  };
}

export default applicationConfiguration;
