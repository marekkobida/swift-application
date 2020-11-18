#!/usr/bin/env node

import path from 'path';

import Compiler from './webpack/Compiler';

(async () => {
  const {
    swift: { applicationsToCompile },
  } = await import(path.resolve(process.cwd(), './package.json'));

  new Compiler().compileApplications(
    applicationsToCompile,
    path.resolve(process.cwd(), './public')
  );
})();
