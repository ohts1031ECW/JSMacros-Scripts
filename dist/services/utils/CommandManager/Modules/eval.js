"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "eval",
    args: {
        "code": {
            type: "greedyString",
        }
    },
    execute: async (Args) => {
        const code = Args.code;
        Chat.log("result: " + eval(code));
    }
};
