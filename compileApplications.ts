/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

import applications from './webpack/applications';

function compileApplications(
  applicationsToCompile: string | string[],
  outputPath: (applicationToCompile: string) => string,
  afterCompilation: () => void,
) {
  if (typeof applicationsToCompile === 'string') {
    applicationsToCompile = [applicationsToCompile];
  }

  const compiler = webpack(applications(applicationsToCompile, outputPath));

  compiler.run((error, $) => {
    if ($) {
      $.stats.forEach(({ compilation }) => {
        compilation.emittedAssets.forEach(emittedAsset =>
          console.log(
            path.resolve(compilation.compiler.outputPath, emittedAsset),
          ),
        );

        compilation.errors.forEach(error =>
          console.log(`\x1b[31m${error.message}\x1b[0m`),
        );
      });

      afterCompilation();
    }
  });
}

export default compileApplications;
