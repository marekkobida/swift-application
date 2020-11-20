/*
 * Copyright 2020 Marek Kobida
 */

import child_process from 'child_process';

import Application from './Application';

class ApplicationStorage {
  applicationStorage: Map<
    string,
    {
      application: ReturnType<Application['toJson']>;
      test: child_process.ChildProcess;
    }
  > = new Map();

  addApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    console.log('ApplicationStorage.addApplication', path);

    if (this.applicationStorage.has(path)) {
      return this.toJson();
    }

    const test = child_process.fork('./node_modules/.bin/open-application', [
      path,
    ]);

    test.on('message', message => {
      if (message[0] === 'ADD_APPLICATION') {
        this.applicationStorage.set(path, {
          application: message[1],
          test,
        });

        test.send(['AFTER_ADD_APPLICATION']);
      }

      if (message[0] === 'AFTER_DELETE_APPLICATION') {
        this.applicationStorage.delete(path);
      }
    });

    return this.toJson();
  }

  deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    console.log('ApplicationStorage.deleteApplication', path);

    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['DELETE_APPLICATION']);
    }

    return this.toJson();
  }

  deleteApplications(): ReturnType<ApplicationStorage['toJson']> {
    console.log('ApplicationStorage.deleteApplications');

    this.applicationStorage.forEach(application =>
      application.test.send(['DELETE_APPLICATION'])
    );

    return this.toJson();
  }

  readApplications(): ReturnType<ApplicationStorage['toJson']> {
    console.log('ApplicationStorage.readApplications');

    return this.toJson();
  }

  toJson(): [string, ReturnType<Application['toJson']>][] {
    console.log('ApplicationStorage.toJson');

    return [...this.applicationStorage].map(([path, { application }]) => [
      path,
      application,
    ]);
  }
}

export default ApplicationStorage;
