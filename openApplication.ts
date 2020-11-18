#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Compiler from './webpack/Compiler';
import NativeApplication from './NativeApplication';

async function openApplication(applicationPath: string) {
  try {
    const application = await import(
      path.resolve(applicationPath, './index.js')
    );

    if (typeof application.default === 'function') {
      new application.default();

      return;
    }

    NativeApplication.sendMessage({ name: 'ERROR' });
  } catch (error) {
    NativeApplication.sendMessage({ name: 'ERROR' });
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

    await openApplication(outputPath || applicationPath);

    return;
  }

  await openApplication(applicationPath);
})(process.argv[2]);
