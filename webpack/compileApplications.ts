/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import application from './application';
import client from './client';

type ApplicationToCompile = { path: string };

type ApplicationsToCompile = ApplicationToCompile[];

async function compileApplications(
  applications: ApplicationsToCompile,
  outputPath: (application: ApplicationToCompile) => ApplicationToCompile['path']
): Promise<ApplicationsToCompile> {
  return new Promise($ => {
    const configuration = [
      ...applications
        .filter(applicationToCompile => {
          return fs.existsSync(path.resolve(applicationToCompile.path, './client.tsx'));
        })
        .map(applicationToCompile => {
          return client(
            path.resolve(applicationToCompile.path, './client.tsx'),
            'client.js',
            outputPath(applicationToCompile)
          );
        }),
      ...applications
        .filter(applicationToCompile => {
          return fs.existsSync(path.resolve(applicationToCompile.path, './index.ts'));
        })
        .map(applicationToCompile => {
          return application(
            path.resolve(applicationToCompile.path, './index.ts'),
            'index.js',
            outputPath(applicationToCompile)
          );
        }),
    ];

    if (configuration.length > 0) {
      const compiler = webpack(configuration);

      compiler.run((error, compilation) => {
        console.log(compilation?.toString({ colors: true }));

        $(
          applications.map(applicationToCompile => {
            applicationToCompile.path = outputPath(applicationToCompile);
            return applicationToCompile;
          })
        );
      });

      return;
    }

    $(applications);
  });
}

export default compileApplications;
