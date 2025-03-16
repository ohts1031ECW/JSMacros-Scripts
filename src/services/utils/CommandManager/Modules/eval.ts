import { ArgsType, CommandTypeBase } from "../types"

export const command: CommandTypeBase = {
    name: "eval",
    args: {
        "code":{
            type: "greedyString",
        }
    },
    execute: async (Args:ArgsType) => {
        const code:string = Args.code
        Chat.log("result: "+eval(code));
    }
}