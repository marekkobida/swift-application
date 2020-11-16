/*
 * Copyright 2020 Marek Kobida
 */

import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

import application from './application'
import client from './client'

async function compileApplications(
  applicationsToCompile: { path: string }[],
  outputPath: (applicationToCompile: { path: string }) => string,
) {
  return new Promise(afterCompilation => {
    const compiler = webpack([
      ...applicationsToCompile
        .filter(applicationToCompile =>
          fs.existsSync(
            path.resolve(applicationToCompile.path, './client.tsx'),
          ),
        )
        .map(applicationToCompile =>
          client(
            path.resolve(applicationToCompile.path, './client.tsx'),
            './client.js',
            outputPath(applicationToCompile),
          ),
        ),
      ...applicationsToCompile
        .filter(applicationToCompile =>
          fs.existsSync(path.resolve(applicationToCompile.path, './index.ts')),
        )
        .map(applicationToCompile =>
          application(
            path.resolve(applicationToCompile.path, './index.ts'),
            './index.js',
            outputPath(applicationToCompile),
          ),
        ),
    ])

    compiler.run((...parameters) => {
      console.log(parameters[1]?.toString({ colors: true }))

      afterCompilation()
    })
  })
}

export default compileApplications
