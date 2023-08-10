import { Command, Setting } from "obsidian";
import { TSCommandSettings, TSGroupSettings } from "./settings";
import CommandEditorModal from "./modal/comand-editor-modal";
import TSPlugin from "./main";
import { addBracket } from "./editor";
import WithinGroupModal from "./modal/within-group-modal";
import GroupEditorModal from "./modal/group-editor-modal";

/* 
    id name rule

    textshortcuts-0
    (plugin name)-(1st layer index)

    textshortcuts-0-0
    (plugin name)-(1st layer index)-(2nd layer index)
*/

export class TSCommand {
    private plugin: TSPlugin;
    private index: number[];
    private settings: TSCommandSettings;
    private parent: TSGroup | null;

    constructor(plugin: TSPlugin, index: number[], settings: TSCommandSettings, parent?: TSGroup | null) {
        this.plugin = plugin;
        this.index = index;
        this.settings = settings
        this.parent = parent || null;
    }

    get name(): string {
        return this.settings.name
    }

    createCommand(): Command {
        let id = "textshortcuts-" + this.index.join("-")
        return {
            id: id,
            name: this.settings.name,
            icon: this.settings.icon? this.settings.icon: undefined,
            editorCheckCallback: ((checking, editor) => {
                if (parent? (this.settings.enable && this.parent?.enable): this.settings.enable) {
                    if (!checking) {
                        addBracket(editor, this.settings.props);
                    }
                    return true;
                }
            })
        }
    }

    createCommandSetting(containerEl: HTMLElement): Setting {
        let item = new Setting(containerEl)
            .setName(this.settings.name)
            .addButton((button) => button
                .setIcon("trash-2")
                .setTooltip("delete")
                .onClick(() => {})
            )
            .addButton((button) => button
                .setIcon("pencil")
                .setTooltip("edit")
                .onClick(async () => {
                    new CommandEditorModal(this.plugin, this).open();
                })
            )
            .addButton((button) => {
                this.settings.enable? button.setIcon("power"): button.setIcon("power-off");
                button.onClick(async () => {
                    this.settings.enable? button.setIcon("power-off"): button.setIcon("power");
                    this.settings.enable = !this.settings.enable;
                    await this.plugin.saveData(this.plugin.settings)
                })
            });
        
        if(this.settings.desc) {
            item.setDesc(this.settings.desc);
            item.nameEl.addClass("textshortcuts-settings-item-command-name");
            item.descEl.addClass("textshortcuts-settings-item-command-desc");
        } else {
            item.nameEl.addClass("textshortcuts-settings-item-command-name-nodesc");
        }

        return item;
    }
}

export class TSGroup {
    private plugin: TSPlugin;
    private index: number;
    private settings: TSGroupSettings;
    private commands: TSCommand[];

    constructor(plugin: TSPlugin, index: number, settings: TSGroupSettings) {
        this.plugin = plugin;
        this.index = index;
        this.settings = settings

        this.commands = []
        settings.commands.forEach((_command, i) => {
            let commandIndex = [index];
            commandIndex.push(i);
            this.commands.push(new TSCommand(plugin, commandIndex, settings.commands[i], this))
        })
    }

    get enable(): boolean {
        return this.settings.enable
    }

    get name(): string {
        return this.settings.name
    }

    static isTSGroup(commanditem: TSCommand | TSGroup): commanditem is TSGroup {
        return (commanditem as TSGroup).commands !== undefined
    }

    createCommands(): Command[] {
        let commands: Command[] = [];
        this.commands.forEach((command) => {
            commands.push(command.createCommand());
        })
        return commands;
    }

    createGroupSetting(containerEl: HTMLElement): Setting {
        let item = new Setting(containerEl)
	    	.setName(this.name)
            .addButton((button) => button
                .setIcon("trash-2")
                .setTooltip("delete")
                .onClick(() => {})
            )
            .addButton((button) => button
                .setIcon("folder-open")
                .setTooltip("open")
                .onClick(() => {
                    new WithinGroupModal(this.plugin, this).open();
                })
            )
            .addButton((button) => button
                .setIcon("pencil")
                .setTooltip("edit")
                .onClick(async () => {
                    new GroupEditorModal(this.plugin, this).open();
                })
            )
            .addButton((button) => {
                (this.settings.enable) ? button.setIcon("power") : button.setIcon("power-off");
                button.onClick(async () => {
                    this.settings.enable? button.setIcon("power-off"): button.setIcon("power");
                    this.settings.enable = !this.settings.enable;
                    await this.plugin.saveData(this.plugin.settings)
                })
            });
            
            if(this.settings.desc) {
                item.setDesc(this.settings.desc);
                item.nameEl.addClass("textshortcuts-settings-item-group-name");
                item.descEl.addClass("textshortcuts-settings-item-group-desc");
            } else {
                item.nameEl.addClass("textshortcuts-settings-item-group-name-nodesc");
            }
    
            return item;
    }

    createChildCommandsSetting(elem: HTMLElement): Setting[] {
        let setting: Setting[] = []
        this.commands.forEach(command => {
            let item = command.createCommandSetting(elem);
            setting.push(item);
        })

        return setting;
    }
}