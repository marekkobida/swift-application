#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Application from './Application';
import Compiler from './webpack/Compiler';

async function openApplication(applicationPath: string) {
  try {
    const $ = await import(path.resolve(applicationPath, './index.js'));

    if (typeof $.default === 'function') {
      const application: Application = new $.default();

      process.on('message', message => {
        if (message.name === 'AFTER_ADD') {
          application.eventEmitter.emit('AFTER_ADD');
        }

        if (message.name === 'DELETE') {
          application.eventEmitter.emit('DELETE');
        }
      });

      application.eventEmitter.on('ADD', application =>
        process.send?.({ application, name: 'ADD' })
      );

      application.eventEmitter.on('AFTER_DELETE', application =>
        process.send?.({ application, name: 'AFTER_DELETE' })
      );

      application.open();
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
