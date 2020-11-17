#!/usr/bin/env node

import os from 'os';
import path from 'path';

import compileApplications from './webpack/compileApplications';

const applicationToCompile = { path: process.argv[2] };

const applicationsToCompile = [applicationToCompile];

const outputPath = path.resolve(
  os.tmpdir(),
  './applications',
  path.basename(applicationToCompile.path)
);

compileApplications(applicationsToCompile, () => outputPath)
  .then(([applicationToCompile]) => import(path.resolve(applicationToCompile.path, './index.js')))
  .then(application => new application.default());
