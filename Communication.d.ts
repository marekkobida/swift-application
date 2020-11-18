import Application from './Application';
export interface ClientMessage {
    application: ReturnType<Application['toJSON']>;
    name: 'ADD' | 'AFTER_DELETE';
}
export interface ServerMessage {
    name: 'AFTER_ADD' | 'DELETE';
}
declare class Communication {
    receiveMessage(receiveMessage: (message: ServerMessage) => Promise<void>): void;
    sendMessage(message: ClientMessage): void;
}
export default Communication;
