/*
 * Copyright 2020 Marek Kobida
 */

const path = require('path');
const webpack = require('webpack');

const applications = require('./webpack/applications');

function compileApplications(
  applicationsToCompile,
  outputPath,
  afterCompilation,
) {
  const compiler = webpack(applications(applicationsToCompile, outputPath));

  compiler.run((error, compilation) => {
    const json = compilation.toJson();

    if (compilation.hasErrors()) {
      json.errors.forEach((error, i) =>
        console.log(`[${i + 1}] \x1b[31m${error.message}\x1b[0m`),
      );
    }

    json.children.forEach((child, i) =>
      child.assets.forEach((asset, ii) =>
        console.log(
          `[${i + 1}][${ii + 1}] ${path.resolve(child.outputPath, asset.name)}`,
        ),
      ),
    );

    afterCompilation(error, compilation);
  });
}

module.exports = compileApplications;
