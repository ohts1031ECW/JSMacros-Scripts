"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandbuilder = Chat.getCommandManager().createCommandBuilder("test");
commandbuilder.executes(JavaWrapper.methodToJava(() => {
    Chat.log("command executed");
}));
commandbuilder.register();
/*
event.stopListener = JavaWrapper.methodToJava(()=>{
    commandbuilder.unregister()
})
*/ 
