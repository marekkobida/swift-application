/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import ConfigurationStorage from './ConfigurationStorage';
import applicationClientConfiguration from './configurations/applicationClientConfiguration';
import applicationConfiguration from './configurations/applicationConfiguration';

class Compiler {
  compile(
    inputPaths: string[],
    outputPath: string,
    configurationStorage: ConfigurationStorage = new ConfigurationStorage()
  ): Promise<{ children: { outputPath?: string }[] }> {
    return new Promise(afterCompilation => {
      const configurations = configurationStorage.resolve(
        inputPaths,
        outputPath
      );

      const compiler = webpack(configurations);

      compiler.run((error, compilation) => {
        if (compilation) {
          console.log(compilation.toString({ colors: true }));

          afterCompilation(compilation.toJson());
        }
      });
    });
  }

  compileApplications(
    inputPaths: string[],
    outputPath: string,
    configurationStorage: ConfigurationStorage = new ConfigurationStorage()
  ) {
    configurationStorage
      .addConfiguration(applicationClientConfiguration)
      .addConfiguration(applicationConfiguration);

    return this.compile(inputPaths, outputPath, configurationStorage);
  }
}

export default Compiler;
