/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

import applications from './webpack/applications';

export const APPLICATION_FILE_NAMES = {
  APPLICATION_CLIENT_JS_FILE_NAME: './client.js',
  APPLICATION_CLIENT_TSX_FILE_NAME: './client.tsx',
  APPLICATION_JS_FILE_NAME: './index.js',
  APPLICATION_TS_FILE_NAME: './index.ts',
};

async function compileApplications(
  applicationsToCompile: string[],
  outputPath: (applicationToCompile: string) => string,
) {
  return new Promise(afterCompilation => {
    const compiler = webpack(applications([applicationsToCompile, outputPath]));

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
  });
}

export default compileApplications;
