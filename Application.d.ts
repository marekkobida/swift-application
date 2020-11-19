import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    httpServer: ApplicationHttpServer;
    constructor(description: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    open(eventEmitter: ApplicationEventEmitter): void;
    toJSON(): {
        description: string;
        httpServerUrl: string | undefined;
        name: string;
        path: string;
        version: string;
    };
}
export default Application;
