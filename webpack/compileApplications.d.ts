declare function compileApplications(applicationsToCompile: {
    path: string;
}[], outputPath: (applicationToCompile: {
    path: string;
}) => string): Promise<unknown>;
export default compileApplications;
