const commandbuilder:CommandBuilder = Chat.getCommandManager().createCommandBuilder("test");
commandbuilder.executes(JavaWrapper.methodToJava(()=>{
    Chat.log("command executed")
}))
commandbuilder.register()

/*
event.stopListener = JavaWrapper.methodToJava(()=>{
    commandbuilder.unregister()
})
*/