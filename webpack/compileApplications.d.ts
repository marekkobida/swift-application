declare function compileApplications(applications: string[], outputPath: string): Promise<{
    children: {
        outputPath: string;
    }[];
}>;
export default compileApplications;
