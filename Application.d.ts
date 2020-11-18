/// <reference types="node" />
import http from 'http';
import net from 'net';
import Communication from './Communication';
declare class Application {
    readonly description: string;
    readonly htmlFileUrl: string;
    readonly name: string;
    readonly version: string;
    communication: Communication;
    httpServer?: http.Server;
    httpServerSockets: Set<net.Socket>;
    constructor(description: string, htmlFileUrl: string, name: string, version: string);
    afterAdd(): Promise<void>;
    afterDelete(): Promise<void>;
    private createHttpServer;
    private httpServerUrl;
    toJSON(): {
        description: string;
        htmlFileUrl: string;
        httpServerUrl: string;
        name: string;
        version: string;
    };
    private updateHtmlFileUrl;
}
export default Application;
