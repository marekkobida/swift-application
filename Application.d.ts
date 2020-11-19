/// <reference types="node" />
import net from 'net';
import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    eventEmitter: ApplicationEventEmitter;
    httpServer: ApplicationHttpServer;
    httpServerSockets: Set<net.Socket>;
    constructor(description: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    open(): void;
    toJSON(): {
        description: string;
        htmlFileUrl: string | undefined;
        httpServerUrl: string;
        name: string;
        version: string;
    };
    private updateHtmlFileUrl;
}
export default Application;
