/// <reference types="node" />
import http from 'http';
import net from 'net';
export declare type ClientMessage = {
    application: ReturnType<NativeApplication['toJSON']>;
    name: 'ADD' | 'AFTER_DELETE';
};
export declare type ServerMessage = {
    name: 'AFTER_ADD' | 'DELETE';
};
declare class NativeApplication {
    readonly description: string;
    readonly htmlFileUrl: string;
    readonly name: string;
    readonly version: string;
    httpServer: http.Server;
    httpServerSockets: Set<net.Socket>;
    constructor(description: string, htmlFileUrl: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    private createHttpServer;
    private httpServerUrl;
    private static receiveMessage;
    private static sendMessage;
    toJSON(): {
        description: string;
        htmlFileUrl: string;
        httpServerUrl: string;
        name: string;
        version: string;
    };
    private updateHtmlFileUrl;
}
export default NativeApplication;
