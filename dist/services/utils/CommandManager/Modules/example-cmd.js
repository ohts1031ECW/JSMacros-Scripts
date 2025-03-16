"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "Example",
    args: {},
    execute: async () => {
        Chat.log("This is example command");
    }
};
