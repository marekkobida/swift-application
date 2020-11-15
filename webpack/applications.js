/*
 * Copyright 2020 Marek Kobida
 */

const fs = require('fs');
const path = require('path');

const client = require('./client');
const server = require('./server');

function applications(applicationsToCompile) {
  return [
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(path.resolve(applicationToCompile, './client.tsx')),
      )
      .map(applicationToCompile =>
        client(
          path.resolve(applicationToCompile, './client.tsx'),
          'client.js',
          path.resolve(
            process.cwd(),
            './public/applications',
            path.basename(applicationToCompile),
          ),
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
          path.resolve(
            process.cwd(),
            './public/applications',
            path.basename(applicationToCompile),
          ),
        ),
      ),
  ];
}

module.exports = applications;
