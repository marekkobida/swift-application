declare function compileApplications(applications: string[], outputPath: (applicationPath: string) => string): Promise<unknown>;
export default compileApplications;
