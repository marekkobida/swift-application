declare type ApplicationToCompile = {
    path: string;
};
declare type ApplicationsToCompile = ApplicationToCompile[];
declare function compileApplications(applications: ApplicationsToCompile, outputPath: (application: ApplicationToCompile) => ApplicationToCompile['path']): Promise<ApplicationsToCompile>;
export default compileApplications;
