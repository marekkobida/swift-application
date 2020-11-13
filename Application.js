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
        process.on('message', (serverIPCMessage) => {
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
    afterAdd() { }
    afterDelete() { }
    sendIPCMessage(clientIPCMessage) {
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
exports.default = Application;
