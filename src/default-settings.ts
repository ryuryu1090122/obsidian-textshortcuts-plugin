import { TSCommandSettings, TSGlobal, TSGroupSettings } from "./settings";

export const DEFAULT_GLOBAL_SETTINGS: TSGlobal = {}

export const DEFAULT_COMMANDS: (TSCommandSettings | TSGroupSettings)[] = [
    {
        name: "Example Command Group",
        desc: "this is example group.",
        enable: true,
        commands: [
            {
                name:"Example Command 1",
                enable: true,
                props: {
                    type: "paired",
                    value: ["<example>", "</example>"],
                    linebreak: false
                }
            }
        ]
    },
    {
        name: "Example Command 2",
        desc: "this is example command.",
        enable: true,
        props: {
            type: "single",
            value: ["\\example!"],
            linebreak: true
        }
    }
]