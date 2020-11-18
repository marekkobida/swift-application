/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

type Configuration = (
  inputPath: string,
  outputPath: string
) => webpack.Configuration | webpack.Configuration[];

class ConfigurationStorage {
  constructor(private configurationStorage: Set<Configuration> = new Set()) {}

  add(configuration: Configuration): this {
    this.configurationStorage.add(configuration);

    return this;
  }

  resolve(inputPaths: string[], outputPath: string): webpack.Configuration[] {
    return [...this.configurationStorage].flatMap(configuration => {
      return inputPaths.flatMap(inputPath => {
        return configuration(inputPath, outputPath);
      });
    });
  }
}

export default ConfigurationStorage;
