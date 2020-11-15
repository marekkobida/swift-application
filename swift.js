#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');

const applications = require('./webpack/applications');

const { applicationsToCompile } = require(path.resolve(
  process.cwd(),
  './package.json',
));

const compiler = webpack(applications(applicationsToCompile));

function $(error, { hasErrors, toJson }) {
  const json = toJson();

  if (hasErrors()) {
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
}

if (process.env.npm_command === 'run-script') {
  compiler.run($);
} else {
  compiler.watch({}, $);
}
