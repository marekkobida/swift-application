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

    const test = child_process.fork(
      './node_modules/.bin/compile-and-open-application',
      [path]
    );

    test.on(
      'message',
      ([event, application]: [string, ReturnType<Application['toJson']>]) => {
        if (event === 'AFTER_CLOSE') {
          this.applicationStorage.set(path, { application, test });
        }

        if (event === 'AFTER_DELETE') {
          this.applicationStorage.delete(path);
        }

        if (event === 'AFTER_OPEN') {
          this.applicationStorage.set(path, { application, test });
        }

        if (event === 'HANDSHAKE') {
          this.applicationStorage.set(path, { application, test });
        }
      }
    );

    return this.toJson();
  }

  closeApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['CLOSE']);
    }

    return this.toJson();
  }

  deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['DELETE']);
    }

    return this.toJson();
  }

  deleteApplications(): ReturnType<ApplicationStorage['toJson']> {
    this.applicationStorage.forEach(application =>
      application.test.send(['DELETE'])
    );

    return this.toJson();
  }

  openApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.test.send(['OPEN']);
    }

    return this.toJson();
  }

  readApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    return this.toJson(
      new Map([...this.applicationStorage].filter($ => $[0] === path))
    );
  }

  readApplications(): ReturnType<ApplicationStorage['toJson']> {
    return this.toJson();
  }

  toJson(
    applicationStorage: ApplicationStorage['applicationStorage'] = this
      .applicationStorage
  ): [string, ReturnType<Application['toJson']>][] {
    return [...applicationStorage].map(([path, { application }]) => [
      path,
      application,
    ]);
  }
}

export default ApplicationStorage;
