/*
 * Copyright 2020 Marek Kobida
 */

const path = require('path');

function server(inputFilePath, outputFileName, outputPath) {
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
                configFile: path.resolve(__dirname, '../babel.config.js'),
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
      extensions: ['.ts', '.js'],
    },
    snapshot: {
      managedPaths: [],
    },
    target: 'node',
  };
}

module.exports = server;
