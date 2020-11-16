/*
 * Copyright 2020 Marek Kobida
 */

import path from 'path';
import webpack from 'webpack';

import applications from './webpack/applications';

function compileApplications(
  applicationsToCompile: string | string[],
  outputPath: (applicationToCompile: string) => string,
  afterCompilation: () => void,
) {
  if (typeof applicationsToCompile === 'string') {
    applicationsToCompile = [applicationsToCompile];
  }

  const compiler = webpack(applications(applicationsToCompile, outputPath));

  compiler.run((error, compilation) => {
    if (compilation) {
      const json = compilation.toJson() as webpack.Compilation;

      if (compilation.hasErrors()) {
        json.errors.forEach((error, i) =>
          console.log(`[${i + 1}] \x1b[31m${error.message}\x1b[0m`),
        );
      }

      json.children.forEach((child, i) =>
        child.assets.forEach((asset, ii) =>
          console.log(
            `[${i + 1}][${ii + 1}] ${path.resolve(
              child.outputPath,
              asset.name,
            )}`,
          ),
        ),
      );

      afterCompilation(error, compilation);
    }
  });
}

module.exports = compileApplications;
