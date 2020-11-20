import Application from './Application';
declare class ApplicationStorage {
    private applicationStorage;
    addApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    deleteApplications(): ReturnType<ApplicationStorage['toJson']>;
    readApplications(): ReturnType<ApplicationStorage['toJson']>;
    toJson(): [string, ReturnType<Application['toJson']>][];
}
export default ApplicationStorage;
