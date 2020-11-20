/// <reference types="node" />
import http from 'http';
declare class ApplicationHttpServer {
    private httpServer?;
    private readonly sockets;
    closeHttpServer(): http.Server | undefined;
    on(event: 'request', onRequest: (request: http.IncomingMessage, response: http.ServerResponse) => void): void;
    openHttpServer(): http.Server;
    url(): string | undefined;
}
export default ApplicationHttpServer;
