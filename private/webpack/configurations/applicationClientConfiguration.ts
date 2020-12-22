/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

function applicationClientConfiguration(
  inputPath: string,
  outputPath: string
): webpack.Configuration {
  return {
    entry: path.resolve(inputPath, './client.tsx'),
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    module: {
      rules: [
        { test: /\.(css|html)$/, type: 'asset/resource' },
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
    name: 'applicationClient',
    output: {
      assetModuleFilename: '[name][ext]',
      filename: 'client.js',
      path: path.resolve(
        outputPath,
        './applications',
        path.basename(inputPath)
      ),
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
  };
}

export default applicationClientConfiguration;
