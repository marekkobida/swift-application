/*
 * Copyright 2020 Marek Kobida
 */

class Application {
  constructor(
    readonly description: string,
    readonly htmlFileUrl: string,
    readonly name: string,
    readonly version: string,
  ) {}

  afterAdd() {}

  afterDelete() {}

  toJSON() {
    return {
      description: this.description,
      htmlFileUrl: this.htmlFileUrl,
      name: this.name,
      version: this.version,
    }
  }
}

export default Application
