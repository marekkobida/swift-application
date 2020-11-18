#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Compiler from './webpack/Compiler';

async function openApplication(applicationPath: string) {
  try {
    const application = await import(
      path.resolve(applicationPath, './index.js')
    );

    if (typeof application.default === 'function') {
      new application.default();

      return;
    }

    console.log('the application is not valid');
  } catch (error) {
    console.log(`the application "${applicationPath}" does not exist`);
  }
}

(async (applicationPath: string) => {
  if (process.env.NODE_ENV === 'development') {
    const {
      children: [{ outputPath }],
    } = await new Compiler().compileApplications(
      [applicationPath],
      os.tmpdir()
    );

    openApplication(outputPath || applicationPath);

    return;
  }

  openApplication(applicationPath);
})(process.argv[2]);
