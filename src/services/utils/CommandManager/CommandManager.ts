import { showArray } from "../../../lib/dev";
import { ArgsType } from "./types";

const CMD_Manager: CommandManager = Chat.getCommandManager();
const ModuleDirPath: string = __dirname + "/Modules/"


let RegisterdCommand: string[] = [];
if (!FS.exists(ModuleDirPath)) {
    //TODO: ADD chat log
    FS.makeDir(ModuleDirPath);
}

//filter modules with .js extension
const Modules = FS.list(ModuleDirPath)?.filter((file)=>{
    return file.endsWith("js")
})


if (Modules !== undefined) {

    for (const ModuleFile of Modules) {
        //import modules
        import(ModuleDirPath + ModuleFile).then((data) => {
            const Module = data.default;


            const CommandBuilder: CommandBuilder = CMD_Manager.createCommandBuilder(Module.name);

            //register command args
            for (const Arg in Module.args) {
                switch (Module.args[Arg]) {
                    case "literal": {
                        CommandBuilder.literalArg(Arg);
                        break;
                    };
                    case "boolean":{
                        CommandBuilder.booleanArg(Arg);
                    }
                    case "int": {
                        CommandBuilder.intArg(Arg);
                        break;
                    };

                }
            }

            //register executes
            CommandBuilder.executes(JavaWrapper.methodToJavaAsync(async (args) => {
                const Args:ArgsType = {};
                for(const Arg in Module.args){
                    Args[Arg] = args.getArg(Arg);
                }
                Client.waitTick(2);
                Module.execute(Args);
            }))


            CommandBuilder.register()
            RegisterdCommand.push(Module.name);

            Chat.log(`${Module.name} was loaded`)
        })

    }
} else {
    //TODO: colorring chat log
    Chat.log("Command file not found in 'Modules' folder(dirctory)");
}


event.stopListener = JavaWrapper.methodToJava(() => {
    for(const commandName of RegisterdCommand){
        CMD_Manager.unregisterCommand(commandName);
    }
})
