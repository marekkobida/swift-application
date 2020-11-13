/*
 * Copyright 2020 Marek Kobida
 */

export interface ClientIPCMessage {
  application: ReturnType<Application['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE';
}

export interface ServerIPCMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

class Application {
  constructor(
    readonly description: string,
    readonly htmlFileUrl: string,
    readonly name: string,
    readonly version: string,
  ) {
    process.on('message', (serverIPCMessage: ServerIPCMessage) => {
      if (serverIPCMessage.name === 'AFTER_ADD') {
        this.afterAdd();
      }

      if (serverIPCMessage.name === 'DELETE') {
        this.afterDelete();

        this.sendIPCMessage({
          application: this.toJSON(),
          name: 'AFTER_DELETE',
        });
      }
    });

    this.sendIPCMessage({
      application: this.toJSON(),
      name: 'ADD',
    });
  }

  afterAdd() {}

  afterDelete() {}

  sendIPCMessage(clientIPCMessage: ClientIPCMessage) {
    process.send?.(clientIPCMessage);
  }

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
