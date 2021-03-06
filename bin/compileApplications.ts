#!/usr/bin/env node

import path from 'path';

import Compiler from '../private/webpack/Compiler';

(async () => {
  const {
    swift: { applicationsToCompile },
  } = await import(path.resolve(process.cwd(), './package.json'));

  await new Compiler().compileApplications(
    applicationsToCompile,
    path.resolve(process.cwd(), './public')
  );
})();
