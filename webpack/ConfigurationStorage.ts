/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

type T = (
  inputPath: string,
  outputPath: string
) => webpack.Configuration | webpack.Configuration[];

class ConfigurationStorage {
  constructor(private configurations: Set<T> = new Set()) {}

  add(configuration: T): this {
    this.configurations.add(configuration);

    return this;
  }

  resolve(inputPaths: string[], outputPath: string): webpack.Configuration[] {
    return [...this.configurations].flatMap(configuration => {
      return inputPaths.flatMap(inputPath => {
        return configuration(inputPath, outputPath);
      });
    });
  }
}

export default ConfigurationStorage;
