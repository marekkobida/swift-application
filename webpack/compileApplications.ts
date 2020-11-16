/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import application from './application';
import client from './client';

export interface ApplicationToCompile {
  path: string;
}

async function compileApplications(
  applicationsToCompile: ApplicationToCompile[],
  outputPath: (
    applicationToCompile: ApplicationToCompile,
  ) => ApplicationToCompile['path'],
) {
  return new Promise(afterCompilation => {
    const compiler = webpack([
      ...applicationsToCompile
        .filter(applicationToCompile =>
          fs.existsSync(
            path.resolve(applicationToCompile.path, './client.tsx'),
          ),
        )
        .map(applicationToCompile =>
          client(
            path.resolve(applicationToCompile.path, './client.tsx'),
            './client.js',
            outputPath(applicationToCompile),
          ),
        ),
      ...applicationsToCompile
        .filter(applicationToCompile =>
          fs.existsSync(path.resolve(applicationToCompile.path, './index.ts')),
        )
        .map(applicationToCompile =>
          application(
            path.resolve(applicationToCompile.path, './index.ts'),
            './index.js',
            outputPath(applicationToCompile),
          ),
        ),
    ]);

    /* ---------------------------------------------------------------- */

    compiler.run((...parameters) => {
      parameters[1]?.stats.forEach(({ compilation }) => {
        compilation.emittedAssets.forEach(emittedAsset =>
          console.log(
            path.resolve(compilation.compiler.outputPath, emittedAsset),
          ),
        );

        compilation.errors.forEach(error =>
          console.log(`\x1b[31m${error.message}\x1b[0m`),
        );
      });

      /* ---------------------------------------------------------------- */

      afterCompilation();
    });
  });
}

export default compileApplications;
