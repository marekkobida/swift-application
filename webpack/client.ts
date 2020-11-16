/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';

function client(
  inputFilePath: string,
  outputFileName: string,
  outputPath: string,
) {
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
          test: /\.(js|ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '../babel.config.js'),
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

export default client;
