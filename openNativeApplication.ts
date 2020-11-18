#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Compiler from './webpack/Compiler';

async function openNativeApplication(applicationPath: string) {
  try {
    const application = await import(
      path.resolve(applicationPath, './index.js')
    );

    if (typeof application.default === 'function') {
      new application.default();

      return;
    }
  } catch (error) {}
}

(async (applicationPath: string) => {
  if (process.env.NODE_ENV === 'development') {
    const {
      children: [{ outputPath }],
    } = await new Compiler().compileApplications(
      [applicationPath],
      os.tmpdir()
    );

    await openNativeApplication(outputPath || applicationPath);

    return;
  }

  await openNativeApplication(applicationPath);
})(process.argv[2]);
