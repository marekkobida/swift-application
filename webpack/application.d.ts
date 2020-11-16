declare function application(inputFilePath: string, outputFileName: string, outputPath: string): {
    devtool: string;
    entry: string;
    mode: "development";
    module: {
        rules: {
            test: RegExp;
            use: {
                loader: string;
                options: {
                    plugins: string[];
                    presets: string[];
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
    target: string;
};
export default application;
