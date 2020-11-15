/*
 * Copyright 2020 Marek Kobida
 */

function server(inputFilePath, outputFileName, outputPath) {
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
          test: /\.(js|ts)$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    output: {
      assetModuleFilename: '[name][ext]',
      filename: outputFileName,
      libraryTarget: 'commonjs',
      path: outputPath,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    target: 'node',
  };
}

module.exports = server;
