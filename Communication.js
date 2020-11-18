"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Communication {
    receiveMessage(receiveMessage) {
        if (typeof window === 'undefined') {
            process.on('message', receiveMessage);
        }
    }
    sendMessage(message) {
        if (typeof window === 'undefined') {
            process.send?.(message);
        }
    }
}
exports.default = Communication;
