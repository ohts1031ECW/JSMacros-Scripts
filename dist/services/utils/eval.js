"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandManager = Chat.getCommandManager();
const commandbuilder = commandManager.createCommandBuilder("eval");
commandbuilder.greedyStringArg("code");
commandbuilder.executes(JavaWrapper.methodToJava((e) => {
    const code = e.getArg("code");
    eval(code);
}));
commandbuilder.register();
event.stopListener = JavaWrapper.methodToJava(() => {
    commandbuilder.unregister();
});
