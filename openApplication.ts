#!/usr/bin/env node

import os from 'os';
import path from 'path';

import compileApplications from './webpack/compileApplications';
import uuid4 from './uuid4';

const applicationPath = process.argv[2];

const outputPath = path.resolve(os.tmpdir(), uuid4());

compileApplications([applicationPath], () => outputPath)
  .then(([applicationPath]) => import(path.resolve(applicationPath, './index.js')))
  .then(application => new application.default());
