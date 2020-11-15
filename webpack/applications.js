/*
 * Copyright 2020 Marek Kobida
 */

const fs = require('fs');
const path = require('path');

const client = require('./client');
const server = require('./server');

function applications(applicationsToCompile, outputPath) {
  return [
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
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(path.resolve(applicationToCompile, './index.ts')),
      )
      .map(applicationToCompile =>
        server(
          path.resolve(applicationToCompile, './index.ts'),
          'index.js',
          outputPath(applicationToCompile),
        ),
      ),
  ];
}

module.exports = applications;
