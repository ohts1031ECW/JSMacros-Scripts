"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const CMD_Manager = Chat.getCommandManager();
const ModuleDirPath = __dirname + "/Modules/";
let RegisterdCommand = [];
if (!FS.exists(ModuleDirPath)) {
    //TODO: ADD chat log
    FS.makeDir(ModuleDirPath);
}
//filter modules with .js extension
const Modules = FS.list(ModuleDirPath)?.filter((file) => {
    return file.endsWith("js");
});
if (Modules !== undefined) {
    for (const ModuleFile of Modules) {
        //import modules
        Promise.resolve(`${ModuleDirPath + ModuleFile}`).then(s => __importStar(require(s))).then((data) => {
            const Module = data.command;
            const CommandBuilder = CMD_Manager.createCommandBuilder(Module.name);
            //register command args
            for (const Arg in Module.args) {
                //Chat.log(`Arg: ${Arg}`)
                //Chat.log(`Argcontent: ${JSON.stringify(Module.args[Arg])}`)
                let CommandBuilder_Arg;
                switch (Module.args[Arg].type) {
                    case "literal":
                        {
                            CommandBuilder_Arg = CommandBuilder.literalArg(Arg);
                            break;
                        }
                        ;
                    case "boolean": {
                        CommandBuilder_Arg = CommandBuilder.booleanArg(Arg);
                        break;
                    }
                    case "int":
                        {
                            CommandBuilder_Arg = CommandBuilder.intArg(Arg);
                            break;
                        }
                        ;
                    case "greedyString": {
                        CommandBuilder_Arg = CommandBuilder.greedyStringArg(Arg);
                    }
                }
                //add sugestion
                const Suggest = Module.args[Arg].suggest;
                if (typeof Suggest !== "undefined") {
                    CommandBuilder_Arg.suggest(JavaWrapper.methodToJava((ctx, builder) => {
                        Suggest(ctx, builder);
                    }));
                }
            }
            //register executes
            CommandBuilder.executes(JavaWrapper.methodToJavaAsync(async (args) => {
                const Args = {};
                for (const Arg in Module.args) {
                    Args[Arg] = args.getArg(Arg);
                }
                Client.waitTick(2);
                Module.execute(Args);
            }));
            CommandBuilder.register();
            RegisterdCommand.push(Module.name);
            Chat.log(`${Module.name} was loaded`);
        });
    }
}
else {
    //TODO: colorring chat log
    Chat.log("Command file not found in 'Modules' folder(dirctory)");
}
event.stopListener = JavaWrapper.methodToJava(() => {
    for (const commandName of RegisterdCommand) {
        CMD_Manager.unregisterCommand(commandName);
    }
});
