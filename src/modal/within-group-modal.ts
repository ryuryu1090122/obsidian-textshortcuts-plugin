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
        const {containerEl} = this;
        containerEl.empty();
        this.titleEl.setText(this.group.name);

        if (this.group.commands.length) {
            this.group.commands.forEach((command) => {
                new Setting(containerEl)
					.setName(command.settingstab? (command.settingstab.title? command.settingstab.title: command.name): command.name)
					.setDesc(command.settingstab? (command.settingstab.desc? command.settingstab.desc: "") : "")
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
            })
        }
    }
}