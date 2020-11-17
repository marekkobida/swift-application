/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

class ApplicationConfiguration<
  T extends (inputPath: string, outputPath: string) => webpack.Configuration
> {
  constructor(private configurations: T[]) {}

  addConfiguration(configuration: T) {
    this.configurations = [...this.configurations, configuration];
  }

  test(inputPaths: string[], outputPath: string): webpack.Configuration[] {
    return this.configurations.flatMap(configuration => {
      return inputPaths.map(inputPath => {
        return configuration(
          inputPath,
          path.resolve(outputPath, './applications', path.basename(inputPath))
        );
      });
    });
  }
}

export default ApplicationConfiguration;
