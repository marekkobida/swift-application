import http from 'http';
import net from 'net';
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
  httpServer: http.Server;
  httpServerSockets: Set<net.Socket>;
  constructor(
    description: string,
    htmlFileUrl: string,
    name: string,
    version: string,
  );
  afterAdd(): void;
  afterDelete(): void;
  private createHttpServer;
  private httpServerUrl;
  sendIPCMessage(clientIPCMessage: ClientIPCMessage): void;
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
