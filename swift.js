#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const compileApplications_1 = __importDefault(require("./compileApplications"));
const { applicationsToCompile } = require(path_1.default.resolve(process.cwd(), './package.json'));
compileApplications_1.default(applicationsToCompile, applicationToCompile => path_1.default.resolve(process.cwd(), './public/applications', path_1.default.basename(applicationToCompile)), () => { });
