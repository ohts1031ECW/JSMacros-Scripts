"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showArray = showArray;
function showArray(Array) {
    for (const Index in Array) {
        Chat.log(`Index: ${Index}, Value: ${Array[Index]}`);
    }
}
