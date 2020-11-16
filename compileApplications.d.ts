declare function compileApplications(
  applicationsToCompile: string | string[],
  outputPath: (applicationToCompile: string) => string,
  afterCompilation: () => void,
): void;
export default compileApplications;
