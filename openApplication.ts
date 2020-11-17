#!/usr/bin/env node

import os from 'os';
import path from 'path';

import compileApplications from './webpack/compileApplications';

const applicationPath = process.argv[2];

const outputPath = os.tmpdir();

compileApplications([applicationPath], outputPath)
  .then(({ children: [{ outputPath }] }) => {
    return import(path.resolve(outputPath, './index.js'));
  })
  .then(application => {
    if (typeof application.default === 'function') {
      new application.default();
    } else {
      return import(path.resolve(applicationPath, './index.js'));
    }
  })
  .then(application => {
    if (typeof application?.default === 'function') {
      new application.default();
    }
  });
