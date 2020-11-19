import ApplicationEventEmitter from './ApplicationEventEmitter';
import ApplicationHttpServer from './ApplicationHttpServer';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    eventEmitter: ApplicationEventEmitter;
    httpServer: ApplicationHttpServer;
    constructor(description: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    open(): void;
    toJSON(): {
        description: string;
        htmlFileUrl: string | undefined;
        httpServerUrl: string;
        name: string;
        version: string;
    } | {
        description: string;
        name: string;
        version: string;
        htmlFileUrl?: undefined;
        httpServerUrl?: undefined;
    };
    private updateHtmlFileUrl;
}
export default Application;
