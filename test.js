/*
 * Copyright 2020 Marek Kobida
 */

const os = require('os');

const ApplicationStorage = require('./public/private/ApplicationStorage')
  .default;
const Compiler = require('./public/private/webpack/Compiler').default;

const applicationStorage = new ApplicationStorage();
const compiler = new Compiler();

(async applicationInputPath => {
  const APPLICATION_OUTPUT_PATH = os.tmpdir();

  // 1. Compile application

  const {
    children: [{ outputPath }],
  } = await compiler.compileApplications(
    [applicationInputPath],
    APPLICATION_OUTPUT_PATH
  );

  // 3. Add application to application storage

  await applicationStorage.addApplication(outputPath);

  // 4. Open application

  applicationStorage.openApplication(outputPath);
})('/Users/marekkobida/Documents/Movies');
