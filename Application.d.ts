/// <reference types="node" />
import http from 'http';
import net from 'net';
import ApplicationEventEmitter from './ApplicationEventEmitter';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    eventEmitter: ApplicationEventEmitter;
    httpServer: http.Server | undefined;
    httpServerSockets: Set<net.Socket>;
    constructor(description: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    private createHttpServer;
    private httpServerUrl;
    open(): void;
    toJSON(): {
        description: string;
        htmlFileUrl: string | undefined;
        httpServerUrl: string | undefined;
        name: string;
        version: string;
    };
    private updateHtmlFileUrl;
}
export default Application;
