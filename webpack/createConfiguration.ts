/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import application from './application';
import client from './client';

function createConfiguration(
  applications: string[],
  outputPath: (applicationPath: string) => string
): webpack.Configuration[] {
  return [
    ...applications
      .filter(applicationPath => {
        return fs.existsSync(path.resolve(applicationPath, './client.tsx'));
      })
      .map(applicationPath => {
        return client(
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
        return application(
          path.resolve(applicationPath, './index.ts'),
          'index.js',
          outputPath(applicationPath)
        );
      }),
  ];
}

export default createConfiguration;
