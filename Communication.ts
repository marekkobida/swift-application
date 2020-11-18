/*
 * Copyright 2020 Marek Kobida
 */

import NativeApplication from './NativeApplication';

export interface ClientMessage {
  application: ReturnType<NativeApplication['toJSON']>;
  name: 'ADD' | 'AFTER_DELETE';
}

export interface ServerMessage {
  name: 'AFTER_ADD' | 'DELETE';
}

class Communication {
  static receiveMessage(
    receiveMessage: (message: ServerMessage) => Promise<void>
  ) {
    process.on('message', receiveMessage);
  }

  static sendMessage(message: ClientMessage) {
    process.send?.(message);
  }
}

export default Communication;
