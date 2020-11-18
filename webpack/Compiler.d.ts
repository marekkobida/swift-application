import ConfigurationStorage from './ConfigurationStorage';
declare class Compiler {
    compile(inputPaths: string[], outputPath: string, configurationStorage?: ConfigurationStorage): Promise<{
        children: {
            outputPath?: string;
        }[];
    }>;
    compileApplications(inputPaths: string[], outputPath: string, configurationStorage?: ConfigurationStorage): Promise<{
        children: {
            outputPath?: string | undefined;
        }[];
    }>;
}
export default Compiler;
