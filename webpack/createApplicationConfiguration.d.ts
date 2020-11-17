import webpack from 'webpack';
declare function createApplicationConfiguration(applications: string[], outputPath: (applicationPath: string) => string): webpack.Configuration[];
export default createApplicationConfiguration;
