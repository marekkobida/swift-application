/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

type L = string;

type R = (inputPath: string, outputPath: string) => webpack.Configuration | webpack.Configuration[];

class ConfigurationStorage {
  constructor(private configurations: Map<L, R> = new Map()) {}

  add(name: L, configuration: R): this {
    this.configurations.set(name, configuration);

    return this;
  }

  delete(name: L): this {
    this.configurations.delete(name);

    return this;
  }

  resolve(inputPaths: string[], outputPath: string): webpack.Configuration[] {
    return [...this.configurations].flatMap(([name, configuration]) => {
      return inputPaths.flatMap(inputPath => {
        const resolvedConfiguration = configuration(inputPath, outputPath);

        if (Array.isArray(resolvedConfiguration)) {
          resolvedConfiguration.forEach(
            (resolvedConfiguration, i) => (resolvedConfiguration.name = `(${i}) ${name}`)
          );
        } else {
          resolvedConfiguration.name = name;
        }

        return resolvedConfiguration;
      });
    });
  }
}

export default ConfigurationStorage;
