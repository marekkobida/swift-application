/*
 * Copyright 2020 Marek Kobida
 */

import Communication from './Communication';

class Application {
  communication = new Communication();

  constructor(
    readonly description: string,
    readonly htmlFileUrl: string,
    readonly name: string,
    readonly version: string
  ) {}

  add() {
    this.communication.receiveMessage(async message => {
      if (message.name === 'AFTER_ADD') {
        await this.afterAdd();
      }

      if (message.name === 'DELETE') {
        this.communication.sendMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });

        await this.afterDelete();
      }
    });

    this.communication.sendMessage({
      application: this.toJSON(),
      name: 'ADD',
    });
  }

  async afterAdd() {}

  async afterDelete() {}

  toJSON() {
    return {
      description: this.description,
      htmlFileUrl: this.htmlFileUrl,
      name: this.name,
      version: this.version,
    };
  }
}

export default Application;
