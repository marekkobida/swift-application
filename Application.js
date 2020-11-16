"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor(description, htmlFileUrl, name, version) {
        this.description = description;
        this.htmlFileUrl = htmlFileUrl;
        this.name = name;
        this.version = version;
    }
    afterAdd() { }
    afterDelete() { }
    toJSON() {
        return {
            description: this.description,
            htmlFileUrl: this.htmlFileUrl,
            name: this.name,
            version: this.version,
        };
    }
}
exports.default = Application;
