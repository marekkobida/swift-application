/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path'
import webpack from 'webpack'

function client(
  inputFilePath: string,
  outputFileName: string,
  outputPath: string,
): webpack.Configuration {
  return {
    devtool: 'inline-source-map',
    entry: inputFilePath,
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
            configFile: path.resolve(__dirname, '../../babel.config.js'),
          },
          test: /\.(js|ts|tsx)$/,
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
  }
}

export default client
