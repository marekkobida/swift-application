#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const Compiler_1 = __importDefault(require("./webpack/Compiler"));
async function openApplication(applicationPath) {
    try {
        const $ = await Promise.resolve().then(() => __importStar(require(path_1.default.resolve(applicationPath, './index.js'))));
        if (typeof $.default === 'function') {
            const application = new $.default();
            process.on('message', message => {
                if (message.name === 'AFTER_ADD') {
                    application.eventEmitter.emit('AFTER_ADD');
                }
                if (message.name === 'DELETE') {
                    application.eventEmitter.emit('DELETE');
                }
            });
            application.eventEmitter.on('ADD', application => process.send?.({ application, name: 'ADD' }));
            application.eventEmitter.on('AFTER_DELETE', application => process.send?.({ application, name: 'AFTER_DELETE' }));
            application.open();
        }
    }
    catch (error) {
        console.log(applicationPath, error);
    }
}
(async (applicationPath) => {
    if (process.env.NODE_ENV === 'development') {
        const { children: [{ outputPath }], } = await new Compiler_1.default().compileApplications([applicationPath], os_1.default.tmpdir());
        await openApplication(outputPath || applicationPath);
        return;
    }
    await openApplication(applicationPath);
})(process.argv[2]);
