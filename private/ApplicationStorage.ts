/*
 * Copyright 2020 Marek Kobida
 */

import Application from './Application';
import Compiler from './webpack/Compiler';

class ApplicationStorage {
  applicationStorage: Map<string, Application> = new Map();

  async addApplication(
    path: string
  ): Promise<ReturnType<ApplicationStorage['toJson']>> {
    if (this.applicationStorage.has(path)) {
      return this.toJson();
    }

    const {
      children: [{ outputPath }],
    } = await new Compiler().compileApplications(
      [path],
      '/Users/marekkobida/Documents/test'
    );

    const $: { default?: new () => Application } = await import(
      `${outputPath}/index.js`
    );

    if (typeof $.default === 'function') {
      const application = new $.default();

      this.applicationStorage.set(path, application);
    }

    return this.toJson();
  }

  closeApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.close();
    }

    return this.toJson();
  }

  deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.delete();
    }

    return this.toJson();
  }

  deleteApplications(): ReturnType<ApplicationStorage['toJson']> {
    this.applicationStorage.forEach(application => application.delete());

    return this.toJson();
  }

  openApplication(path: string): ReturnType<ApplicationStorage['toJson']> {
    const application = this.applicationStorage.get(path);

    if (application) {
      application.open();
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
    return [...applicationStorage].map(([path, application]) => [
      path,
      application.toJson(),
    ]);
  }
}

export default ApplicationStorage;
