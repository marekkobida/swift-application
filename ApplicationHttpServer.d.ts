/// <reference types="node" />
import http from 'http';
declare class ApplicationHttpServer {
    private httpServer?;
    private httpServerSockets;
    closeHttpServer(): http.Server;
    on(event: 'request', onRequest: (request: http.IncomingMessage, response: http.ServerResponse) => void): void;
    openHttpServer(): http.Server;
    url(): string;
}
export default ApplicationHttpServer;
