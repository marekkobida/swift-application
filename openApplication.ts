#!/usr/bin/env node

import os from 'os';
import path from 'path';

import compileApplications from './webpack/compileApplications';

const applicationPath = process.argv[2];

const outputPath = path.resolve(os.tmpdir(), './applications', path.basename(applicationPath));

compileApplications([applicationPath], () => outputPath)
  .then(([applicationPath]) => import(path.resolve(applicationPath, './index.js')))
  .then(application => new application.default());
