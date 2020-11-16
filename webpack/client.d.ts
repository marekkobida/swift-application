declare function client(inputFilePath: string, outputFileName: string, outputPath: string): {
    devtool: string;
    entry: string;
    mode: "development";
    module: {
        rules: ({
            test: RegExp;
            type: string;
            loader?: undefined;
            options?: undefined;
        } | {
            loader: string;
            options: {
                plugins: string[];
                presets: string[];
            };
            test: RegExp;
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
};
export default client;
