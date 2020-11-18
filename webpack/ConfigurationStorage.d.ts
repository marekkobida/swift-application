import webpack from 'webpack';
declare type L = string;
declare type R = (inputPath: string, outputPath: string) => webpack.Configuration;
declare class ConfigurationStorage {
    private configurations;
    constructor(configurations?: Map<L, R>);
    add(name: L, configuration: R): this;
    delete(name: L): this;
    resolve(inputPaths: string[], outputPath: string): webpack.Configuration[];
}
export default ConfigurationStorage;
