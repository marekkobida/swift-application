"use strict";
/*
 * Copyright 2020 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./client.css");
require("./client.html");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
function TestApplicationClient() {
    const [about, updateAbout] = react_1.default.useState();
    react_1.default.useEffect(() => {
        const url = new URL(globalThis.location.toString());
        const applicationHttpServerUrl = url.searchParams.get('applicationHttpServerUrl');
        if (applicationHttpServerUrl) {
            fetch(new URL('/about', applicationHttpServerUrl).toString())
                .then(response => response.json())
                .then(updateAbout);
        }
    }, [about?.httpServerUrl]);
    if (about) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h1", null, about.name),
            react_1.default.createElement("p", null, about.description),
            react_1.default.createElement("p", null, about.version)));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Error")));
}
react_dom_1.default.render(react_1.default.createElement(TestApplicationClient, null), document.getElementById('client'));
