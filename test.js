(async () => {
  const ApplicationStorage = require('./public/private/ApplicationStorage')
    .default;

  const applicationStorage = new ApplicationStorage();

  await applicationStorage.addApplication(
    '/Users/marekkobida/Documents/Movies'
  );

  console.log(applicationStorage);
})();
