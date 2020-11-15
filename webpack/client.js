/*
 * Copyright 2020 Marek Kobida
 */

function client(
  inputFilePath,
  outputFileName,
  outputPath,
  test = 'electron-renderer',
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
    target: test,
  };
}

module.exports = client;
