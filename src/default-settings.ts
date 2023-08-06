import { TSCommand, TSGlobal, TSCommandGroup } from "./types";

export const DEFAULT_GLOBAL_SETTINGS: TSGlobal = {}

export const DEFAULT_COMMANDS: (TSCommand | TSCommandGroup)[] = [
    {
        id: "example-command-group",
        name: "Example Command Group",
        enable: true,
        settingtab: {
            desc: "this is example group."
        },
        commands: [
            {
                id: "example-command-1",
                name:"Example Command 1",
                enable: true,
                props: {
                    type: "bracket",
                    value: ["<example>", "</example>"]
                }
            }
        ]
    },
    {
        id: "example-command-2",
        name: "Example Command 2",
        enable: true,
        props: {
            type: "single",
            value: ["\\example!"]
        },
        settingtab: {
            desc: "this is example command."
        }
    }
]