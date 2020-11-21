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

      process.on('message', ([event]) => {
        if (event === 'CLOSE_APPLICATION') {
          test.close();
        }

        if (event === 'DELETE_APPLICATION') {
          test.delete();
        }

        if (event === 'OPEN_APPLICATION') {
          test.open();
        }
      });

      const events = [
        'AFTER_CLOSE_APPLICATION',
        'AFTER_DELETE_APPLICATION',
        'AFTER_OPEN_APPLICATION',
      ] as const;

      events.forEach(event =>
        test.eventEmitter.on(event, (...parameters) =>
          process.send?.([event, ...parameters])
        )
      );

      process.send?.(['ADD_APPLICATION_TO_STORAGE', test.toJson()]);
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
