# Obsidian Math Commands Plugin

**Math Commands Plugin** provides convenient shortcut commands for typing using LateX, MathJax, and other math-related formats.

In addition to default commands such as "Add Formulas" and "Add Parentheses," it also allows users to create custom commands.

## Create Custom Commands

To create custom commands, you need to add elements to the "commands" field in the data.json file located in the plugin's source directory (usually : `your-vault/.obsidian/plugins/obsidian-mathcommands-plugin/data.json`).


```json
{
    "commands": [
        {
            "id": "add-equation-block", // An unique ID of your Command.
            "name": "Add Equation", //Name of Command that displays in Command Palette.
            "enable": true, //This can be Changed with Plugin's Settings tab.
            "icon": "dollar-sign", //Optional. Available icons are "https://lucide.dev/"
            "property": {
                "type": "bracket", //"single" or "bracket" can be selected.
                "value": ["\\begin{equation}", "\\end{equation}"],
                "linebreakstyle": "enableAutoLinebreakEquation" //Optional.
            },
            "settingstab": {
                "settingstitle": "Add Equation", //Displays in Settings tab.
                "settingsdesc": "\\begin{ equation } ... \\end{ equation }" //Optional.
            }
        },
        {
            ...
        }
    ]
}
```