#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Application from '../private/Application';
import Compiler from '../private/webpack/Compiler';

async function openApplication(applicationPath: string) {
  try {
    const application: { default: new () => Application } = await import(
      path.resolve(applicationPath, './index.js')
    );

    if (typeof application.default === 'function') {
      const test = new application.default();

      process.on('message', message => {
        if (message.name === 'AFTER_ADD_APPLICATION') {
          test.eventEmitter.emit('AFTER_ADD_APPLICATION');
        }

        if (message.name === 'DELETE_APPLICATION') {
          test.eventEmitter.emit('DELETE_APPLICATION');
        }
      });

      test.eventEmitter.on('ADD_APPLICATION', application =>
        process.send?.({ application, name: 'ADD_APPLICATION' })
      );

      test.eventEmitter.on('AFTER_DELETE_APPLICATION', application =>
        process.send?.({ application, name: 'AFTER_DELETE_APPLICATION' })
      );

      test.open();
    }
  } catch (error) {
    console.log(applicationPath, error);
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
