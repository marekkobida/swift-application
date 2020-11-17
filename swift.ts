#!/usr/bin/env node

import path from 'path';

import compileApplications from './webpack/compileApplications';

import(path.resolve(process.cwd(), './package.json')).then(
  ({ swift: { applicationsToCompile } }) => {
    return compileApplications(applicationsToCompile, path.resolve(process.cwd(), './public'));
  }
);
