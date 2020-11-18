import webpack from 'webpack';
declare type T = (inputPath: string, outputPath: string) => webpack.Configuration | webpack.Configuration[];
declare class ConfigurationStorage {
    private configurations;
    constructor(configurations?: Set<T>);
    add(configuration: T): this;
    resolve(inputPaths: string[], outputPath: string): webpack.Configuration[];
}
export default ConfigurationStorage;
