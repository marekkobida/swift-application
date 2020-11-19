/// <reference types="node" />
import http from 'http';
declare class ApplicationHttpServer {
    private httpServer?;
    private httpServerSockets;
    closeHttpServer(): http.Server;
    openHttpServer(): http.Server;
    url(): string;
}
export default ApplicationHttpServer;
