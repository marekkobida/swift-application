import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    readonly eventEmitter: ApplicationEventEmitter;
    readonly httpServer: ApplicationHttpServer;
    constructor(description: string, name: string, version: string);
    close(): void;
    delete(): void;
    open(): void;
    toJson(): {
        description: string;
        httpServerUrl: string | undefined;
        name: string;
        path: string;
        version: string;
    };
}
export default Application;
