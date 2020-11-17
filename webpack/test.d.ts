import webpack from 'webpack';
declare class ApplicationConfiguration<T extends (inputPath: string, outputPath: string) => webpack.Configuration> {
    private configurations;
    constructor(configurations: T[]);
    addConfiguration(configuration: T): void;
    test(inputPaths: string[], outputPath: string): webpack.Configuration[];
}
export default ApplicationConfiguration;
