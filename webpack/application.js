/*
 * Copyright 2020 Marek Kobida
 */

const path = require('path');

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
      extensions: ['.js', '.ts'],
    },
    snapshot: {
      managedPaths: [],
    },
    target: 'node',
  };
}

module.exports = application;
