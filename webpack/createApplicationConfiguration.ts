/*
 * Copyright 2020 Marek Kobida
 */

import webpack from 'webpack';

import applicationClientConfiguration from './applicationClientConfiguration';
import applicationConfiguration from './applicationConfiguration';

function createApplicationConfiguration(
  applications: string[],
  outputPath: (applicationPath: string) => string
): webpack.Configuration[] {
  const configurations = [applicationClientConfiguration, applicationConfiguration];

  return configurations.flatMap(configuration =>
    applications.map(applicationPath => configuration(applicationPath, outputPath(applicationPath)))
  );
}

export default createApplicationConfiguration;
