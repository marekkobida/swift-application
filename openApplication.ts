#!/usr/bin/env node

import fs from 'fs'
import os from 'os'
import path from 'path'

import compileApplications from './webpack/compileApplications'

async function openApplication() {
  let applicationToCompilePath = process.argv[2]

  if (fs.existsSync(path.resolve(applicationToCompilePath, './index.ts'))) {
    const outputPath = path.resolve(
      os.tmpdir(),
      './applications',
      path.basename(applicationToCompilePath),
    )

    await compileApplications(
      [{ path: applicationToCompilePath }],
      () => outputPath,
    )

    applicationToCompilePath = outputPath
  }

  let application = require(path.resolve(
    applicationToCompilePath,
    './index.js',
  )).default

  new application()
}

openApplication()
