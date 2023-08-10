import { Command, Setting } from "obsidian";
import { TSCommandSettings, TSCommandSettingsProperty, TSGroupSettings } from "./settings";
import CommandEditorModal from "./modal/comand-editor-modal";
import TSPlugin from "./main";
import { inputText } from "./editor";
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
    private index: number;
    private settings: TSCommandSettings;
    private parent: TSGroup | null;

    constructor(plugin: TSPlugin, index: number, settings: TSCommandSettings, parent?: TSGroup | null) {
        this.plugin = plugin;
        this.index = index;
        this.settings = settings
        this.parent = parent || null;
    }

    get name(): string {
        return this.settings.name
    }
    set name(name: string) {
        this.settings.name = name;
    }

    get desc(): string | undefined {
        return this.settings.desc
    }
    set desc(desc: string | undefined) {
        this.settings.desc = desc;
    }

    get icon(): string | undefined {
        return this.settings.icon
    }
    set icon(icon: string | undefined) {
        this.settings.icon = icon;
    }

    get type(): "single" | "paired" {
        return this.settings.props.type
    }
    set type(type: "single" | "paired") {
        this.settings.props.type = type;
    }

    get value(): string[] {
        return this.settings.props.value
    }
    set value(value: string[]) {
        this.settings.props.value = value;
    }

    get linebreak(): boolean {
        return this.settings.props.linebreak
    }
    set linebreak(linebreak: boolean) {
        this.settings.props.linebreak = linebreak;
    }

    get parentGroup(): TSGroup | null {
        return this.parent
    }

    migrate(index?: number) {
        if (this.parent) {
            let setting = (this.plugin.settings.commands[this.parent.index] as TSGroupSettings).commands.splice(this.index, 1)[0];
            if (index !== undefined) {
                (this.plugin.settings.commands[index] as TSGroupSettings).commands.push(setting);
            } else {
                this.plugin.settings.commands.push(setting);
            }
        } else {
            let setting = (this.plugin.settings.commands.splice(this.index, 1)[0] as TSCommandSettings);
            if (index !== undefined) {
                (this.plugin.settings.commands[index] as TSGroupSettings).commands.push(setting);
            } else {
                this.plugin.settings.commands.push(setting);
            }
        }
    }

    createCommand(): Command {
        let id = this.parent? "textshortcuts-" + [this.parent.index, this.index].join("-"): "textshortcuts-" + [this.index].join("-");
        return {
            id: id,
            name: this.settings.name,
            icon: this.settings.icon? this.settings.icon: undefined,
            editorCheckCallback: ((checking, editor) => {
                if ((!this.parent || this.settings.enable) && (!this.parent || this.parent.enable)) {
                    if (!checking) {
                        inputText(editor, this.settings.props);
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
    private mIndex: number;
    private settings: TSGroupSettings;
    private commands: TSCommand[];

    constructor(plugin: TSPlugin, index: number, settings: TSGroupSettings) {
        this.plugin = plugin;
        this.mIndex = index;
        this.settings = settings

        this.commands = []
        settings.commands.forEach((_command, i) => {
            this.commands.push(new TSCommand(plugin, i, settings.commands[i], this))
        })
    }

    get enable(): boolean {
        return this.settings.enable
    }

    get name(): string {
        return this.settings.name
    }

    get desc(): string | undefined {
        return this.settings.desc
    }

    get index(): number {
        return this.mIndex
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