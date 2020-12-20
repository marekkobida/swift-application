#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Application from '../private/Application';
import Compiler from '../private/webpack/Compiler';

async function compileAndOpenApplication(applicationPath: string) {
  try {
    const $: { default?: new () => Application } = await import(
      path.resolve(applicationPath, './index.js')
    );

    if (typeof $.default === 'function') {
      const application = new $.default();

      process.on('message', ([event]: [string]) => {
        if (event === 'CLOSE') {
          application.close();
        }

        if (event === 'DELETE') {
          application.delete();
        }

        if (event === 'OPEN') {
          application.open();
        }
      });

      const events = ['AFTER_CLOSE', 'AFTER_DELETE', 'AFTER_OPEN'] as const;

      events.forEach(event =>
        application.eventEmitter.on(event, (...parameters) =>
          process.send?.([event, ...parameters])
        )
      );

      process.send?.(['HANDSHAKE', application.toJson()]);
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

    await compileAndOpenApplication(outputPath || applicationPath);

    return;
  }

  await compileAndOpenApplication(applicationPath);
})(process.argv[2]);
