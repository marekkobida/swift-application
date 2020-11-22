/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';

import ApplicationStorage from './ApplicationStorage';

const ApplicationStorageHttpServer = (applicationStorage: ApplicationStorage) =>
  http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.setHeader('Content-Type', 'application/json');

    /* */

    const requestedUrl = new URL(request.url as string, 'file://');

    const pathFromRequestedUrlSearchParameters = requestedUrl.searchParams.get(
      'path'
    );

    /* add application */

    if (
      pathFromRequestedUrlSearchParameters &&
      request.method === 'POST' &&
      requestedUrl.pathname === '/application-storage'
    ) {
      return response.end(
        JSON.stringify(
          applicationStorage.addApplication(
            pathFromRequestedUrlSearchParameters
          )
        )
      );
    }

    /* close application */

    if (
      request.method === 'GET' &&
      requestedUrl.pathname === '/application-storage/close'
    ) {
      if (pathFromRequestedUrlSearchParameters) {
        return response.end(
          JSON.stringify(
            applicationStorage.closeApplication(
              pathFromRequestedUrlSearchParameters
            )
          )
        );
      }
    }

    /* delete application(s) */

    if (
      request.method === 'DELETE' &&
      requestedUrl.pathname === '/application-storage'
    ) {
      if (pathFromRequestedUrlSearchParameters) {
        return response.end(
          JSON.stringify(
            applicationStorage.deleteApplication(
              pathFromRequestedUrlSearchParameters
            )
          )
        );
      }

      return response.end(
        JSON.stringify(applicationStorage.deleteApplications())
      );
    }

    /* open application */

    if (
      request.method === 'GET' &&
      requestedUrl.pathname === '/application-storage/open'
    ) {
      if (pathFromRequestedUrlSearchParameters) {
        return response.end(
          JSON.stringify(
            applicationStorage.openApplication(
              pathFromRequestedUrlSearchParameters
            )
          )
        );
      }
    }

    /* read application(s) */

    if (
      request.method === 'GET' &&
      requestedUrl.pathname === '/application-storage'
    ) {
      if (pathFromRequestedUrlSearchParameters) {
        return response.end(
          JSON.stringify(
            applicationStorage.readApplication(
              pathFromRequestedUrlSearchParameters
            )
          )
        );
      }

      return response.end(
        JSON.stringify(applicationStorage.readApplications())
      );
    }

    /* */

    return response.end(
      JSON.stringify(
        `The requested URL "${requestedUrl.toString()}" is not valid.`
      )
    );
  });

export default ApplicationStorageHttpServer;
