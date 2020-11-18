import ConfigurationStorage from './ConfigurationStorage';
declare class Compiler {
    compile(configurationStorage: ConfigurationStorage, inputPaths: string[], outputPath: string): Promise<{
        children: {
            name?: string;
            outputPath?: string;
        }[];
    }>;
    compileApplications(inputPaths: string[], outputPath: string, configurationStorage?: ConfigurationStorage): Promise<{
        children: {
            name?: string | undefined;
            outputPath?: string | undefined;
        }[];
    }>;
}
export default Compiler;
