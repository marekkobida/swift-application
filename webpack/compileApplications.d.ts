declare function compileApplications(applicationsToCompile: string[], outputPath: (applicationToCompile: string) => string): Promise<unknown>;
export default compileApplications;
