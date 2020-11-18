/*
 * Copyright 2020 Marek Kobida
 */

import events from 'events';

import Application from './Application';

interface Events {
  ADD: (application: ReturnType<Application['toJSON']>) => void;
  AFTER_ADD: () => void;
  AFTER_DELETE: (application: ReturnType<Application['toJSON']>) => void;
  DELETE: () => void;
}

declare interface ApplicationEventEmitter {
  emit<Event extends keyof Events>(
    event: Event,
    ...parameters: Parameters<Events[Event]>
  ): boolean;

  on<Event extends keyof Events>(event: Event, listener: Events[Event]): this;
}

class ApplicationEventEmitter extends events.EventEmitter {}

export default ApplicationEventEmitter;
