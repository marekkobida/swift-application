declare function applications(applicationsToCompile: string[], outputPath: (applicationToCompile: string) => string): ({
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
} | {
    devtool: string;
    entry: string;
    mode: string;
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
                    configFile: string;
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
})[];
export default applications;
