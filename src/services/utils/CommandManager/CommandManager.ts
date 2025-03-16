import { showArray } from "../../../lib/dev";
import { ArgsType, CommandTypeBase } from "./types";

const CMD_Manager: CommandManager = Chat.getCommandManager();
const ModuleDirPath: string = __dirname + "/Modules/"


let RegisterdCommand: string[] = [];
if (!FS.exists(ModuleDirPath)) {
    //TODO: ADD chat log
    FS.makeDir(ModuleDirPath);
}

//filter modules with .js extension
const Modules = FS.list(ModuleDirPath)?.filter((file) => {
    return file.endsWith("js")
})


if (Modules !== undefined) {

    for (const ModuleFile of Modules) {
        //import modules
        import(ModuleDirPath + ModuleFile).then((data) => {
            const Module: CommandTypeBase = data.command;


            const CommandBuilder: CommandBuilder = CMD_Manager.createCommandBuilder(Module.name);

            //register command args
            for (const Arg in Module.args) {
                //Chat.log(`Arg: ${Arg}`)
                //Chat.log(`Argcontent: ${JSON.stringify(Module.args[Arg])}`)
                let CommandBuilder_Arg;
                switch (Module.args[Arg].type) {
                    case "literal": {
                        CommandBuilder_Arg = CommandBuilder.literalArg(Arg);
                        break;
                    };
                    case "boolean": {
                        CommandBuilder_Arg = CommandBuilder.booleanArg(Arg);
                        break;
                    }
                    case "int": {
                        CommandBuilder_Arg = CommandBuilder.intArg(Arg);
                        break;
                    };
                    case "greedyString": {
                        CommandBuilder_Arg = CommandBuilder.greedyStringArg(Arg);
                    }

                }

                //add sugestion
                const Suggest = Module.args[Arg].suggest
                if (typeof Suggest !== "undefined") {
                    CommandBuilder_Arg.suggest(
                        JavaWrapper.methodToJava((ctx: CommandContextHelper, builder: SuggestionsBuilderHelper) => {
                            Suggest(ctx, builder)
                        })
                    )
                }
            }

            //register executes
            CommandBuilder.executes(JavaWrapper.methodToJavaAsync(async (args) => {
                const Args: ArgsType = {};
                for (const Arg in Module.args) {
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
    for (const commandName of RegisterdCommand) {
        CMD_Manager.unregisterCommand(commandName);
    }
})
