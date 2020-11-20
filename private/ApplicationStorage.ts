/*
 * Copyright 2020 Marek Kobida
 */

import child_process from 'child_process';

import Application from './Application';

class ApplicationStorage {
  private applicationStorage: Map<
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

    process.on('message', message => {
      if (message.name === 'ADD_APPLICATION') {
        this.applicationStorage.set(path, {
          application: message.application,
          test,
        });

        test.send({ name: 'AFTER_ADD_APPLICATION' });
      }

      if (message.name === 'AFTER_DELETE_APPLICATION') {
        this.applicationStorage.delete(path);
      }
    });

    return this.toJson();
  }

  deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send({ name: 'DELETE_APPLICATION' });
    }

    return this.toJson();
  }

  deleteApplications(): ReturnType<ApplicationStorage['toJson']> {
    this.applicationStorage.forEach(application =>
      application.test.send({ name: 'DELETE_APPLICATION' })
    );

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
