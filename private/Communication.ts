/*
 * Copyright 2020 Marek Kobida
 */

import Application from './Application';

export interface ClientMessage {
  application: ReturnType<Application['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE';
}

export interface ServerMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

class Communication {
  receiveMessage(receiveMessage: (message: ServerMessage) => Promise<void>) {
    if (typeof window === 'undefined') {
      process.on('message', receiveMessage);
    }
  }

  sendMessage(message: ClientMessage) {
    if (typeof window === 'undefined') {
      process.send?.(message);
    }
  }
}

export default Communication;
