/// <reference types="node" />
import events from 'events';
import Application from './Application';
interface Events {
    AFTER_CLOSE: (application: ReturnType<Application['toJson']>) => void;
    AFTER_DELETE: (application: ReturnType<Application['toJson']>) => void;
    AFTER_OPEN: (application: ReturnType<Application['toJson']>) => void;
}
declare interface ApplicationEventEmitter {
    emit<Event extends keyof Events>(event: Event, ...parameters: Parameters<Events[Event]>): boolean;
    on<Event extends keyof Events>(event: Event, listener: Events[Event]): this;
}
declare class ApplicationEventEmitter extends events.EventEmitter {
}
export default ApplicationEventEmitter;
