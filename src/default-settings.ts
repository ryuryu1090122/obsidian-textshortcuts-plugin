import { TSCommand, TSGlobal, TSCommandGroup } from "./types";

/* 	
	{
		"globalsettings": {
		},
		"commands": [
            {
                "id": "mathjax-group"
                "name": "MathJax Commands"
                "commands": [
                    {
           		        "id": "add-equation-block",
       		            "name": "Add Equation",
       		            "enable": true,
       		            "icon": "dollar-sign",
  			            "property": {
            	        	"type": "bracket",
            	        	"value": ["\\begin{equation}", "\\end{equation}"],
            	        	"linebreakstyle": false
                        },
                        "settingstab": {
                            "settingstitle": "Add Equation",
                            "settingsdesc": "\\begin{ equation } ... \\end{ equation }"
                        }
                    },
                ]
            }
			{
           		"id": "add-equation-block",
       		    "name": "Add Equation",
       		    "enable": true,
       		    "icon": "dollar-sign",
  			    "property": {
            		"type": "bracket",
            		"value": ["\\begin{equation}", "\\end{equation}"],
            		"linebreakstyle": false
                },
                "settingstab": {
                    "settingstitle": "Add Equation",
                    "settingsdesc": "\\begin{ equation } ... \\end{ equation }"
                }
            },
		]
	}
*/

export const DEFAULT_GLOBAL_SETTINGS: TSGlobal = {
}

export const DEFAULT_COMMANDS: (TSCommand | TSCommandGroup)[] = [
    {
        id: "example-command-group",
        name: "Example Command Group",
        enable: true,
        settingstab: {
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
        settingstab: {
            desc: "this is example command."
        }
    }
]