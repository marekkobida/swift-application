/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import createApplicationConfiguration from './createApplicationConfiguration';

async function compileApplications(
  applications: string[],
  outputPath: string
): Promise<{ children: { outputPath: string }[] }> {
  return new Promise(afterCompilation => {
    const configuration = createApplicationConfiguration(applications, outputPath);

    const compiler = webpack(configuration);

    compiler.run((error, compilation) => {
      console.log(compilation?.toString({ colors: true }));

      afterCompilation(compilation?.toJson());
    });
  });
}

export default compileApplications;
