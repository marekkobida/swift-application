declare function compileApplications(applicationsToCompile: string | string[], outputPath: (applicationToCompile: string) => string): Promise<unknown>;
export default compileApplications;
