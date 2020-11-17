#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';

import compileApplications from './webpack/compileApplications';

const applicationToCompilePath = process.argv[2];

if (fs.existsSync(path.resolve(applicationToCompilePath, './index.js'))) {
  import(path.resolve(applicationToCompilePath, './index.js')).then(
    application => new application()
  );
}

if (fs.existsSync(path.resolve(applicationToCompilePath, './index.ts'))) {
  const outputPath = path.resolve(
    os.tmpdir(),
    './applications',
    path.basename(applicationToCompilePath)
  );

  compileApplications([{ path: applicationToCompilePath }], () => outputPath)
    .then(() => import(path.resolve(outputPath, './index.js')))
    .then(application => new application());
}
