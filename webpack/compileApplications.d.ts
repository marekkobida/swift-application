declare function compileApplications(applications: string[], outputPath: string): Promise<{
    children: {
        name?: string;
        outputPath?: string;
    }[];
}>;
export default compileApplications;
