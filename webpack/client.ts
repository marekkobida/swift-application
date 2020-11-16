/*
 * Copyright 2020 Marek Kobida
 */

function client(
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
          test: /\.css$/,
          type: 'asset/resource',
        },
        {
          test: /\.(js|ts|tsx)$/,
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
      path: outputPath,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
  };
}

export default client;
