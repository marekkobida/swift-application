/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import applicationClientConfigurationTs from './applicationClientConfiguration.ts';
import applicationConfiguration from './applicationConfiguration';

function createApplicationConfiguration(
  applications: string[],
  outputPath: (applicationPath: string) => string
): webpack.Configuration[] {
  return [
    ...applications
      .filter(applicationPath => {
        return fs.existsSync(path.resolve(applicationPath, './client.tsx'));
      })
      .map(applicationPath => {
        return applicationClientConfigurationTs(
          path.resolve(applicationPath, './client.tsx'),
          'client.js',
          outputPath(applicationPath)
        );
      }),
    ...applications
      .filter(applicationPath => {
        return fs.existsSync(path.resolve(applicationPath, './index.ts'));
      })
      .map(applicationPath => {
        return applicationConfiguration(
          path.resolve(applicationPath, './index.ts'),
          'index.js',
          outputPath(applicationPath)
        );
      }),
  ];
}

export default createApplicationConfiguration;
