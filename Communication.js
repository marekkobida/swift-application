"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Communication {
    static receiveMessage(receiveMessage) {
        process.on('message', receiveMessage);
    }
    static sendMessage(message) {
        process.send?.(message);
    }
}
exports.default = Communication;
