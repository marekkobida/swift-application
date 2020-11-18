"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Communication_1 = __importDefault(require("./Communication"));
class Application {
    constructor(description, htmlFileUrl, name, version) {
        this.description = description;
        this.htmlFileUrl = htmlFileUrl;
        this.name = name;
        this.version = version;
        this.communication = new Communication_1.default();
    }
    add() {
        this.communication.receiveMessage(async (message) => {
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
    async afterAdd() { }
    async afterDelete() { }
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
