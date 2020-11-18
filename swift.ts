#!/usr/bin/env node

import path from 'path';

import compileApplications from './webpack/compileApplications';

(async () => {
  const {
    swift: { applicationsToCompile },
  } = await import(path.resolve(process.cwd(), './package.json'));

  await compileApplications(applicationsToCompile, path.resolve(process.cwd(), './public'));
})();
