import Application from './Application';
declare class ApplicationStorage {
    applicationStorage: Map<string, Application>;
    addApplication(path: string): Promise<ReturnType<ApplicationStorage['toJson']>>;
    closeApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    deleteApplications(): ReturnType<ApplicationStorage['toJson']>;
    openApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    readApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    readApplications(): ReturnType<ApplicationStorage['toJson']>;
    toJson(applicationStorage?: ApplicationStorage['applicationStorage']): [string, ReturnType<Application['toJson']>][];
}
export default ApplicationStorage;
