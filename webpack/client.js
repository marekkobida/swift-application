/*
 * Copyright 2020 Marek Kobida
 */

const path = require('path');

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
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
}

module.exports = client;
