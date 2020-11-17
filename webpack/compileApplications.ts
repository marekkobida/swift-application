/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import createApplicationConfiguration from './createApplicationConfiguration';

async function compileApplications(
  applications: string[],
  outputPath: (applicationPath: string) => string
): Promise<string[]> {
  return new Promise($ => {
    const configuration = createApplicationConfiguration(applications, outputPath);

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
