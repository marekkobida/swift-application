import ApplicationHttpServer from './ApplicationHttpServer';
declare class Application {
    readonly description: string;
    readonly name: string;
    readonly version: string;
    readonly httpServer: ApplicationHttpServer;
    constructor(description: string, name: string, version: string);
    close(): void;
    delete(): void;
    open(): void;
    toJson(): {
        description: string;
        httpServerUrl: string | undefined;
        name: string;
        version: string;
    };
}
export default Application;