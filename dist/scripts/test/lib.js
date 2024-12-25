"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
function CreateConfig(name) {
    if (FS.exists(name)) {
    }
}
function init() {
    //if(FS.exists(""))
}
const ConfigManager = {
    CreateConfig: CreateConfig,
};
exports.ConfigManager = ConfigManager;
