"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Communication {
    receiveMessage(receiveMessage) {
        process.on('message', receiveMessage);
    }
    sendMessage(message) {
        process.send?.(message);
    }
}
exports.default = Communication;
