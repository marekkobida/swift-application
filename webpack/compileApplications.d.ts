declare function compileApplications(applications: string[], outputPath: (applicationPath: string) => string): Promise<string[]>;
export default compileApplications;
