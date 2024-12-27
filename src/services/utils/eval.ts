const commandManager:CommandManager = Chat.getCommandManager();
const commandbuilder:CommandBuilder = commandManager.createCommandBuilder("eval")
commandbuilder.greedyStringArg("code")
commandbuilder.executes(JavaWrapper.methodToJava((e)=>{
    const code:string = e.getArg("code");
    eval(code)
}))
commandbuilder.register();


event.stopListener = JavaWrapper.methodToJava(()=>{
    commandbuilder.unregister()
})