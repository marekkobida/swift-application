/// <reference types="node" />
import http from 'http';
import ApplicationStorage from './ApplicationStorage';
declare const ApplicationStorageHttpServer: (applicationStorage: ApplicationStorage) => http.Server;
export default ApplicationStorageHttpServer;
