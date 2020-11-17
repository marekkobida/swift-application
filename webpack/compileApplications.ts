/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import Test from './test';
import applicationClientConfiguration from './applicationClientConfiguration';
import applicationConfiguration from './applicationConfiguration';

const test = new Test([applicationClientConfiguration, applicationConfiguration]);

function compileApplications(
  applications: string[],
  outputPath: string
): Promise<{ children: { outputPath: string }[] }> {
  return new Promise(afterCompilation => {
    const configuration = test.test(applications, outputPath);

    const compiler = webpack(configuration);

    compiler.run((error, compilation) => {
      console.log(compilation?.toString({ colors: true }));

      afterCompilation(compilation?.toJson());
    });
  });
}

export default compileApplications;
