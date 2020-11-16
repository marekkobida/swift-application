#!/usr/bin/env node

import path from 'path';

import compileApplications from './compileApplications';

const { applicationsToCompile } = require(path.resolve(
  process.cwd(),
  './package.json',
));

compileApplications(
  applicationsToCompile,
  applicationToCompile =>
    path.resolve(
      process.cwd(),
      './public/applications',
      path.basename(applicationToCompile),
    ),
  () => {},
);
