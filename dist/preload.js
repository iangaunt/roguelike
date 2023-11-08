"use strict";
const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("document", {
    document: () => document
});
window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    let versions = ["chrome", "node", "electron"];
    for (const type of versions) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});
