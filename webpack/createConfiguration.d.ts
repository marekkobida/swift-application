import webpack from 'webpack';
declare function createConfiguration(applications: string[], outputPath: (applicationPath: string) => string): webpack.Configuration[];
export default createConfiguration;
