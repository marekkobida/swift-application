/*
 * Copyright 2020 Marek Kobida
 */

function application(
  inputFilePath: string,
  outputFileName: string,
  outputPath: string,
) {
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
          test: /\.(js|ts)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['@babel/plugin-proposal-class-properties'],
                presets: ['@babel/preset-react', '@babel/preset-typescript'],
              },
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
      extensions: ['.js', '.ts'],
    },
    snapshot: {
      managedPaths: [],
    },
    target: 'node',
  };
}

export default application;
