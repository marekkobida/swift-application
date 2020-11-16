/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';

import application from './application';
import client from './client';

function applications(
  applicationsToCompile: string[],
  outputPath: (applicationToCompile: string) => string,
) {
  return [
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(path.resolve(applicationToCompile, './index.ts')),
      )
      .map(applicationToCompile =>
        application(
          path.resolve(applicationToCompile, './index.ts'),
          './index.js',
          outputPath(applicationToCompile),
        ),
      ),
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(path.resolve(applicationToCompile, './client.tsx')),
      )
      .map(applicationToCompile =>
        client(
          path.resolve(applicationToCompile, './client.tsx'),
          './client.js',
          outputPath(applicationToCompile),
        ),
      ),
  ];
}

export default applications;
