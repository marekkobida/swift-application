#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');

const applications = require('./webpack/applications');

const { applicationsToCompile } = require(path.resolve(
  process.cwd(),
  './package.json',
));

webpack(applications(applicationsToCompile), (error, $) =>
  console.log($.toString({ colors: true })),
);
