/// <reference types="node" />
import child_process from 'child_process';
import Application from './Application';
declare class ApplicationStorage {
    applicationStorage: Map<string, {
        application: ReturnType<Application['toJson']>;
        test: child_process.ChildProcess;
    }>;
    addApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    closeApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    deleteApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    deleteApplications(): ReturnType<ApplicationStorage['toJson']>;
    openApplication(path: string): ReturnType<ApplicationStorage['toJson']>;
    readApplications(): ReturnType<ApplicationStorage['toJson']>;
    toJson(): [string, ReturnType<Application['toJson']>][];
}
export default ApplicationStorage;
