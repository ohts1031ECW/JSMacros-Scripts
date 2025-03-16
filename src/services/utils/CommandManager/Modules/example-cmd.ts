import { CommandTypeBase } from "../types"

export const command: CommandTypeBase = {
    name: "Example",
    args: {},
    execute: async () => {
        Chat.log("This is example command")
    }
}