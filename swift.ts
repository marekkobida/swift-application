#!/usr/bin/env node

import path from 'path';

import compileApplications from './compileApplications';

async function swift() {
  const { applicationsToCompile } = await import(
    path.resolve(process.cwd(), './package.json')
  );

  await compileApplications(applicationsToCompile, applicationToCompile =>
    path.resolve(
      process.cwd(),
      './public/applications',
      path.basename(applicationToCompile),
    ),
  );
}

swift();
