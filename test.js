/*
 * Copyright 2020 Marek Kobida
 */

const os = require('os');

const ApplicationStorage = require('./public/private/ApplicationStorage')
  .default;
const Compiler = require('./public/private/webpack/Compiler').default;

const applicationStorage = new ApplicationStorage();
const compiler = new Compiler();

(async (applicationInputPath, applicationOutputPath = os.tmpdir()) => {
  // 1. Compile application
  const {
    children: [{ outputPath }],
  } = await compiler.compileApplications(
    [applicationInputPath],
    applicationOutputPath
  );

  // 3. Add application to application storage
  await applicationStorage.addApplication(outputPath);

  // 4. Open application from application storage
  applicationStorage.openApplication(outputPath);

  // 5. Read application from application storage
  console.log(applicationStorage.readApplication(outputPath));
})(process.argv[2], process.argv[3]);
