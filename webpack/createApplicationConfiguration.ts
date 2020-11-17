/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

import applicationClientConfiguration from './applicationClientConfiguration';
import applicationConfiguration from './applicationConfiguration';

function createApplicationConfiguration(
  applications: string[],
  outputPath: string
): webpack.Configuration[] {
  const configurations = [applicationClientConfiguration, applicationConfiguration];

  return configurations.flatMap(configuration =>
    applications.map(applicationPath =>
      configuration(
        applicationPath,
        path.resolve(outputPath, './applications', path.basename(applicationPath))
      )
    )
  );
}

export default createApplicationConfiguration;
