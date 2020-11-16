/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path'
import webpack from 'webpack'

function application(
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
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '../../babel.config.js'),
          },
          test: /\.(js|ts)$/,
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
    target: 'node',
  }
}

export default application
