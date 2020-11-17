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
    devtool: 'inline-source-map',
    entry: path.resolve(inputPath, './client.tsx'),
    mode: 'development' as const,
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

export default applicationClientConfiguration;
