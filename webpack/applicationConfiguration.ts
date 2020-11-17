/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

function applicationConfiguration(inputPath: string, outputPath: string): webpack.Configuration {
  return {
    devtool: 'inline-source-map',
    entry: path.resolve(inputPath, './index.ts'),
    mode: 'development' as const,
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
      libraryTarget: 'commonjs',
      path: outputPath,
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    target: 'node',
  };
}

export default applicationConfiguration;
