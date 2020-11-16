/*
 * Copyright 2020 Marek Kobida
 */

const fs = require('fs');
const path = require('path');

const application = require('./application');
const client = require('./client');

function applications(applicationsToCompile, outputPath) {
  return [
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(path.resolve(applicationToCompile, './index.ts')),
      )
      .map(applicationToCompile =>
        application(
          path.resolve(applicationToCompile, './index.ts'),
          'index.js',
          outputPath(applicationToCompile),
        ),
      ),
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(path.resolve(applicationToCompile, './client.tsx')),
      )
      .map(applicationToCompile =>
        client(
          path.resolve(applicationToCompile, './client.tsx'),
          'client.js',
          outputPath(applicationToCompile),
        ),
      ),
  ];
}

module.exports = applications;
