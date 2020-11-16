/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';

import application from './application';
import client from './client';

const APPLICATION_CLIENT_JS_FILE_NAME = './client.js';
const APPLICATION_CLIENT_TSX_FILE_NAME = './client.tsx';

const APPLICATION_JS_FILE_NAME = './index.js';
const APPLICATION_TS_FILE_NAME = './index.ts';

function applications(
  applicationsToCompile: string[],
  outputPath: (applicationToCompile: string) => string,
) {
  return [
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(
          path.resolve(applicationToCompile, APPLICATION_TS_FILE_NAME),
        ),
      )
      .map(applicationToCompile =>
        application(
          path.resolve(applicationToCompile, APPLICATION_TS_FILE_NAME),
          APPLICATION_JS_FILE_NAME,
          outputPath(applicationToCompile),
        ),
      ),
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(
          path.resolve(applicationToCompile, APPLICATION_CLIENT_TSX_FILE_NAME),
        ),
      )
      .map(applicationToCompile =>
        client(
          path.resolve(applicationToCompile, APPLICATION_CLIENT_TSX_FILE_NAME),
          APPLICATION_CLIENT_JS_FILE_NAME,
          outputPath(applicationToCompile),
        ),
      ),
  ];
}

export default applications;
