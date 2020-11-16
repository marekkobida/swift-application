/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs';
import path from 'path';

import application from './application';
import client from './client';

import compileApplications, {
  APPLICATION_FILE_NAMES,
} from '../compileApplications';

function applications([applicationsToCompile, outputPath]: Parameters<
  typeof compileApplications
>) {
  return [
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(
          path.resolve(
            applicationToCompile,
            APPLICATION_FILE_NAMES.APPLICATION_TS_FILE_NAME,
          ),
        ),
      )
      .map(applicationToCompile =>
        application(
          path.resolve(
            applicationToCompile,
            APPLICATION_FILE_NAMES.APPLICATION_TS_FILE_NAME,
          ),
          APPLICATION_FILE_NAMES.APPLICATION_JS_FILE_NAME,
          outputPath(applicationToCompile),
        ),
      ),
    ...applicationsToCompile
      .filter(applicationToCompile =>
        fs.existsSync(
          path.resolve(
            applicationToCompile,
            APPLICATION_FILE_NAMES.APPLICATION_CLIENT_TSX_FILE_NAME,
          ),
        ),
      )
      .map(applicationToCompile =>
        client(
          path.resolve(
            applicationToCompile,
            APPLICATION_FILE_NAMES.APPLICATION_CLIENT_TSX_FILE_NAME,
          ),
          APPLICATION_FILE_NAMES.APPLICATION_CLIENT_JS_FILE_NAME,
          outputPath(applicationToCompile),
        ),
      ),
  ];
}

export default applications;
