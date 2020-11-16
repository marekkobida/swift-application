declare function application(inputFilePath: string, outputFileName: string, outputPath: string): {
    devtool: string;
    entry: string;
    mode: string;
    module: {
        rules: {
            test: RegExp;
            use: {
                loader: string;
                options: {
                    configFile: string;
                };
            }[];
        }[];
    };
    output: {
        filename: string;
        libraryTarget: string;
        path: string;
    };
    resolve: {
        extensions: string[];
    };
    snapshot: {
        managedPaths: never[];
    };
    target: string;
};
export default application;
