export interface ClientIPCMessage {
    application: ReturnType<Application['toJSON']>;
    name: 'ADD' | 'AFTER_DELETE';
}
export interface ServerIPCMessage {
    name: 'AFTER_ADD' | 'DELETE';
}
declare class Application {
    readonly description: string;
    readonly htmlFileUrl: string;
    readonly name: string;
    readonly version: string;
    constructor(description: string, htmlFileUrl: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    sendIPCMessage(clientIPCMessage: ClientIPCMessage): void;
    toJSON(): {
        description: string;
        htmlFileUrl: string;
        name: string;
        version: string;
    };
}
export default Application;
