declare class Application {
    readonly description: string;
    readonly htmlFileUrl: string;
    readonly name: string;
    readonly version: string;
    constructor(description: string, htmlFileUrl: string, name: string, version: string);
    afterAdd(): void;
    afterDelete(): void;
    toJSON(): {
        description: string;
        htmlFileUrl: string;
        name: string;
        version: string;
    };
}
export default Application;
