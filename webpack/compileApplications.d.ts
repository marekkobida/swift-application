export interface ApplicationToCompile {
    path: string;
}
declare function compileApplications(applicationsToCompile: ApplicationToCompile[], outputPath: (applicationToCompile: ApplicationToCompile) => ApplicationToCompile['path']): Promise<unknown>;
export default compileApplications;
