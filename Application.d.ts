import Communication from './Communication';
declare class Application {
    readonly description: string;
    readonly htmlFileUrl: string;
    readonly name: string;
    readonly version: string;
    communication: Communication;
    constructor(description: string, htmlFileUrl: string, name: string, version: string);
    add(): void;
    afterAdd(): Promise<void>;
    afterDelete(): Promise<void>;
    toJSON(): {
        description: string;
        htmlFileUrl: string;
        name: string;
        version: string;
    };
}
export default Application;
