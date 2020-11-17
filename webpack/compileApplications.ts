/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import createConfiguration from './createConfiguration';

async function compileApplications(
  applications: string[],
  outputPath: (applicationPath: string) => string
): Promise<string[]> {
  return new Promise($ => {
    const configuration = createConfiguration(applications, outputPath);

    if (configuration.length > 0) {
      const compiler = webpack(configuration);

      compiler.run((error, compilation) => {
        console.log(compilation?.toString({ colors: true }));

        $(applications.map(applicationPath => outputPath(applicationPath)));
      });

      return;
    }

    $(applications);
  });
}

export default compileApplications;
