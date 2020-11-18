/// <reference types="node" />
import http from 'http';
import net from 'net';
import Communication from './Communication';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    communication: Communication;
    htmlFileUrl?: string;
    httpServer?: http.Server;
    httpServerSockets: Set<net.Socket>;
    constructor(description: string, name: string, version: string);
    afterAdd(): Promise<void>;
    afterDelete(): Promise<void>;
    private createHttpServer;
    private httpServerUrl;
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
