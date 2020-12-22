"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../Application"));
class TestApplication extends Application_1.default {
    constructor() {
        super('TestApplication', 'TestApplication', '1.0.0');
    }
}
exports.default = TestApplication;
