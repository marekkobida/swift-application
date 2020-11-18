/*
 * Copyright 2020 Marek Kobida
 */

import Application from './Application';
import NativeApplication from './NativeApplication';

export interface ClientMessage {
  application: ReturnType<Application['toJSON'] | NativeApplication['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE';
}

export interface ServerMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

class Communication {
  receiveMessage(receiveMessage: (message: ServerMessage) => Promise<void>) {
    process.on('message', receiveMessage);
  }

  sendMessage(message: ClientMessage) {
    process.send?.(message);
  }
}

export default Communication;
