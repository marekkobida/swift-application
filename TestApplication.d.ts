/// <reference types="node" />
import http from 'http';
import net from 'net';
import Application from './Application';
declare class TestApplication extends Application {
    server?: http.Server;
    sockets: Set<net.Socket>;
    constructor();
    afterAdd(): void;
    afterDelete(): void;
}
export default TestApplication;
