#!/usr/bin/env node

import os from 'os';
import path from 'path';

import Application from './Application';
import ApplicationEventEmitter from './ApplicationEventEmitter';
import Compiler from './webpack/Compiler';

const applicationEventEmitter = new ApplicationEventEmitter();

process.on('message', message => {
  if (message.name === 'AFTER_ADD') {
    applicationEventEmitter.emit('AFTER_ADD');
  }

  if (message.name === 'DELETE') {
    applicationEventEmitter.emit('DELETE');
  }
});

applicationEventEmitter.on('ADD', application =>
  process.send?.({ application, name: 'ADD' })
);

applicationEventEmitter.on('AFTER_DELETE', application =>
  process.send?.({ application, name: 'AFTER_DELETE' })
);

async function openApplication(applicationPath: string) {
  try {
    const test = await import(path.resolve(applicationPath, './index.js'));

    if (typeof test.default === 'function') {
      const application: Application = new test.default();

      application.open(applicationEventEmitter);
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
