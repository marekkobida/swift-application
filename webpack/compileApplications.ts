/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import createApplicationConfiguration from './createApplicationConfiguration';

async function compileApplications(
  applications: string[],
  outputPath: (applicationPath: string) => string
) {
  return new Promise($ => {
    const configuration = createApplicationConfiguration(applications, outputPath);

    const compiler = webpack(configuration);

    compiler.run((error, compilation) => {
      console.log(compilation?.toString({ colors: true }));

      $();
    });
  });
}

export default compileApplications;
