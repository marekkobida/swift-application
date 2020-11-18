import webpack from 'webpack';
declare type Configuration = (inputPath: string, outputPath: string) => webpack.Configuration | webpack.Configuration[];
declare class ConfigurationStorage {
    private configurationStorage;
    constructor(configurationStorage?: Set<Configuration>);
    add(configuration: Configuration): this;
    resolve(inputPaths: string[], outputPath: string): webpack.Configuration[];
}
export default ConfigurationStorage;
