export declare const APPLICATION_FILE_NAMES: {
    APPLICATION_CLIENT_JS_FILE_NAME: string;
    APPLICATION_CLIENT_TSX_FILE_NAME: string;
    APPLICATION_JS_FILE_NAME: string;
    APPLICATION_TS_FILE_NAME: string;
};
declare function compileApplications(applicationsToCompile: string[], outputPath: (applicationToCompile: string) => string): Promise<unknown>;
export default compileApplications;
