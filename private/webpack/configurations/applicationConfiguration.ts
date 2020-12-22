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
      libraryTarget: 'commonjs',
      path: path.resolve(
        outputPath,
        './applications',
        path.basename(inputPath)
      ),
    },
    resolve: { extensions: ['.js', '.ts'] },
    target: 'node',
  };
}

export default applicationConfiguration;
