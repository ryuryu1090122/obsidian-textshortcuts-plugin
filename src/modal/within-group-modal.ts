import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";
import { TSCommand, TSCommandGroup } from "../types";
import CommandEditorModal from "./comand-editor-modal";

export default class WithinGroupModal extends Modal {
    private readonly plugin: TSPlugin;
    group: TSCommandGroup;

    constructor(plugin: TSPlugin, group: TSCommandGroup) {
        super(plugin.app);
        this.plugin = plugin;
        this.group = group;
    }

    onOpen() {
        this.createWithinGroupDisplay();
    }

    createWithinGroupDisplay() {
        this.titleEl.setText(this.group.name);
        this.titleEl.addClass("textshortcuts-modal-within-group-hedder");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        if (this.group.commands.length) {
            this.group.commands.forEach((command) => {
                const commandSetting =
                new Setting(contentEl)
					.setName(command.settingtab? (command.settingtab.title? command.settingtab.title: command.name): command.name)
					.setDesc(command.settingtab? (command.settingtab.desc? command.settingtab.desc: "") : "")
                    .addButton((button) => button
                        .setIcon("trash-2")
                        .setTooltip("delete")
                        .onClick(() => {})
                    )
                    .addButton((button) => button
                        .setIcon("pencil")
                        .setTooltip("edit")
                        .onClick(async () => {
                            new CommandEditorModal(this.plugin, command).open();
                        })
                    )
                    .addButton((button) => {
                        (command.enable) ? button.setIcon("power") : button.setIcon("power-off");
                        button.onClick(async () => {
                            (command.enable) ? button.setIcon("power-off") : button.setIcon("power");
                            command.enable = !command.enable;
                            await this.plugin.saveData(this.plugin.settings)
                        })
                    })
                if (command.settingtab?.desc) {
                    commandSetting.nameEl.addClass("textshortcuts-settings-item-command-name");
                    commandSetting.descEl.addClass("textshortcuts-settings-item-command-desc");
                } else {
                    commandSetting.nameEl.addClass("textshortcuts-settings-item-command-name-nodesc");
                }
            })
        }
    }
}