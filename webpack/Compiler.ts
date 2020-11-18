/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import ConfigurationStorage from './ConfigurationStorage';
import applicationClientConfiguration from './configurations/applicationClientConfiguration';
import applicationConfiguration from './configurations/applicationConfiguration';

class Compiler {
  compile(
    configurationStorage: ConfigurationStorage,
    inputPaths: string[],
    outputPath: string
  ): Promise<{ children: { outputPath?: string }[] }> {
    return new Promise(afterCompilation => {
      const configuration = configurationStorage.resolve(
        inputPaths,
        outputPath
      );

      const compiler = webpack(configuration);

      compiler.run((error, compilation) => {
        console.log(compilation?.toString({ colors: true, modules: false }));

        afterCompilation(compilation?.toJson());
      });
    });
  }

  compileApplications(
    inputPaths: string[],
    outputPath: string,
    configurationStorage: ConfigurationStorage = new ConfigurationStorage()
  ) {
    configurationStorage
      .add(applicationConfiguration)
      .add(applicationClientConfiguration);

    return this.compile(configurationStorage, inputPaths, outputPath);
  }
}

export default Compiler;
