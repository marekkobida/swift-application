import NativeApplication from './NativeApplication';
export interface ClientMessage {
    application: ReturnType<NativeApplication['toJSON']>;
    name: 'ADD' | 'AFTER_DELETE';
}
export interface ServerMessage {
    name: 'AFTER_ADD' | 'DELETE';
}
declare class Communication {
    static receiveMessage(receiveMessage: (message: ServerMessage) => Promise<void>): void;
    static sendMessage(message: ClientMessage): void;
}
export default Communication;
