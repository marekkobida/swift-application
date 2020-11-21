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
    if (this.applicationStorage.has(path)) {
      return this.toJson();
    }

    const test = child_process.fork('./node_modules/.bin/open-application', [
      path,
    ]);

    test.on('message', ([event, application]) => {
      if (event === 'ADD_APPLICATION_TO_STORAGE') {
        this.applicationStorage.set(path, { application, test });
      }

      if (event === 'AFTER_CLOSE_APPLICATION') {
        this.applicationStorage.set(path, { application, test });
      }

      if (event === 'AFTER_DELETE_APPLICATION') {
        this.applicationStorage.delete(path);
      }

      if (event === 'AFTER_OPEN_APPLICATION') {
        this.applicationStorage.set(path, { application, test });
      }
    });

    return this.toJson();
  }

  closeApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['CLOSE_APPLICATION']);
    }

    return this.toJson();
  }

  deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['DELETE_APPLICATION']);
    }

    return this.toJson();
  }

  deleteApplications(): ReturnType<ApplicationStorage['toJson']> {
    this.applicationStorage.forEach(application =>
      application.test.send(['DELETE_APPLICATION'])
    );

    return this.toJson();
  }

  openApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['OPEN_APPLICATION']);
    }

    return this.toJson();
  }

  readApplications(): ReturnType<ApplicationStorage['toJson']> {
    return this.toJson();
  }

  toJson(): [string, ReturnType<Application['toJson']>][] {
    return [...this.applicationStorage].map(([path, { application }]) => [
      path,
      application,
    ]);
  }
}

export default ApplicationStorage;
