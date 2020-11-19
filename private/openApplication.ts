#!/usr/bin/env node

import os from 'os';
import path from 'path';

import ApplicationEventEmitter from './ApplicationEventEmitter';
import Compiler from './webpack/Compiler';

const applicationEventEmitter = new ApplicationEventEmitter();

process.on('message', message => {
  if (message.name === 'AFTER_ADD') {
    applicationEventEmitter.emit('AFTER_ADD_APPLICATION');
  }

  if (message.name === 'DELETE') {
    applicationEventEmitter.emit('DELETE_APPLICATION');
  }
});

applicationEventEmitter.on('ADD_APPLICATION', application =>
  process.send?.({ application, name: 'ADD' })
);

applicationEventEmitter.on('AFTER_DELETE_APPLICATION', application =>
  process.send?.({ application, name: 'AFTER_DELETE' })
);

async function openApplication(applicationPath: string) {
  try {
    const Application = await import(
      path.resolve(applicationPath, './index.js')
    );

    if (typeof Application.default === 'function') {
      new Application.default().open(applicationEventEmitter);
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
