#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';

import compileApplications from './compileApplications';

const APPLICATION_PATH = process.argv[2];

const APPLICATION_NAME = path.basename(APPLICATION_PATH);

const APPLICATION_TS_FILE_PATH = path.resolve(APPLICATION_PATH, './index.ts');

const OUTPUT_PATH = path.resolve(
  os.tmpdir(),
  './applications',
  APPLICATION_NAME,
);

async function openApplication() {
  if (path.isAbsolute(APPLICATION_PATH)) {
    if (fs.existsSync(APPLICATION_TS_FILE_PATH)) {
      await compileApplications([APPLICATION_PATH], () => OUTPUT_PATH);

      let application = require(path.resolve(OUTPUT_PATH, './index.js'))
        .default;

      new application();

      return;
    }

    let application = require(path.resolve(APPLICATION_PATH, './index.js'))
      .default;

    new application();

    return;
  }

  throw new Error(
    `The application path "${APPLICATION_PATH}" is not absolute.`,
  );
}

openApplication();
