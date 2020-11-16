#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';

import compileApplications from './webpack/compileApplications';

async function openApplication() {
  let applicationToCompile = process.argv[2];

  /* ---------------------------------------------------------------- */

  if (fs.existsSync(path.resolve(applicationToCompile, './index.ts'))) {
    const outputPath = path.resolve(
      os.tmpdir(),
      './applications',
      path.basename(applicationToCompile),
    );

    await compileApplications([applicationToCompile], () => outputPath);

    applicationToCompile = outputPath;
  }

  /* ---------------------------------------------------------------- */

  let application = require(path.resolve(applicationToCompile, './index.js'))
    .default;

  new application();
}

openApplication();
