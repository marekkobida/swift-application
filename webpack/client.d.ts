declare function client(inputFilePath: string, outputFileName: string, outputPath: string): {
    devtool: string;
    entry: string;
    mode: "development";
    module: {
        rules: ({
            test: RegExp;
            type: string;
            use?: undefined;
        } | {
            test: RegExp;
            use: {
                loader: string;
                options: {
                    plugins: string[];
                    presets: string[];
                };
            }[];
            type?: undefined;
        })[];
    };
    output: {
        assetModuleFilename: string;
        filename: string;
        path: string;
    };
    resolve: {
        extensions: string[];
    };
    snapshot: {
        managedPaths: never[];
    };
};
export default client;