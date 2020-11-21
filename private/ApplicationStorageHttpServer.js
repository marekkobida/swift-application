"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ApplicationStorageHttpServer = (applicationStorage) => http_1.default.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/json');
    /* ---------------------------------------------------------------- */
    const requestedUrl = new URL(request.url, 'file://');
    const pathFromRequestedUrlSearchParameters = requestedUrl.searchParams.get('path');
    /* add application */
    if (pathFromRequestedUrlSearchParameters &&
        request.method === 'POST' &&
        requestedUrl.pathname === '/application-storage') {
        return response.end(JSON.stringify(applicationStorage.addApplication(pathFromRequestedUrlSearchParameters)));
    }
    /* close application */
    if (request.method === 'GET' &&
        requestedUrl.pathname === '/application-storage/close') {
        if (pathFromRequestedUrlSearchParameters) {
            return response.end(JSON.stringify(applicationStorage.closeApplication(pathFromRequestedUrlSearchParameters)));
        }
    }
    /* delete application(s) */
    if (request.method === 'DELETE' &&
        requestedUrl.pathname === '/application-storage') {
        if (pathFromRequestedUrlSearchParameters) {
            return response.end(JSON.stringify(applicationStorage.deleteApplication(pathFromRequestedUrlSearchParameters)));
        }
        return response.end(JSON.stringify(applicationStorage.deleteApplications()));
    }
    /* open application */
    if (request.method === 'GET' &&
        requestedUrl.pathname === '/application-storage/open') {
        if (pathFromRequestedUrlSearchParameters) {
            return response.end(JSON.stringify(applicationStorage.openApplication(pathFromRequestedUrlSearchParameters)));
        }
    }
    /* read applications */
    if (request.method === 'GET' &&
        requestedUrl.pathname === '/application-storage') {
        return response.end(JSON.stringify(applicationStorage.readApplications()));
    }
    /* ---------------------------------------------------------------- */
    return response.end(JSON.stringify(`The requested URL "${requestedUrl.toString()}" is not valid.`));
});
exports.default = ApplicationStorageHttpServer;
