"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function readApplicationHttpServerUrl() {
    const url = new URL(window.location.toString());
    const applicationHttpServerUrl = url.searchParams.get('applicationHttpServerUrl');
    if (applicationHttpServerUrl) {
        return applicationHttpServerUrl;
    }
}
exports.default = readApplicationHttpServerUrl;
