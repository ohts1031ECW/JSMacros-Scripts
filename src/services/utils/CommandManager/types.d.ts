interface ArgsType {
    [key: string]: any
}

interface CommandTypeBase {
    name: string,
    args: Record<string, {
        type: 
        "int" |
        "boolean" |
        "greedyString" |
        "literal"; 
        suggest?: (ctx:CommandContextHelper,builder:SuggestionsBuilderHelper) => void
    }>,
    execute: (arg: ArgsType) => void
}


export {
    ArgsType,
    CommandTypeBase
}