import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";
import { TSCommand } from "../types";
import { getParentGroup, isTSCommandGroup } from "../util";

export default class CommandEditorModal extends Modal {
    plugin: TSPlugin;
    command: null | TSCommand;

    constructor(plugin: TSPlugin, commanditem?: TSCommand) {
        super(plugin.app);
        this.plugin = plugin;
        this.command = commanditem? commanditem: null;
    }

    onOpen() {
        this.command? this.editCommandDisplay(this.command): this.createNewCommandDisplay();
    }

    createNewCommandDisplay() {
        this.titleEl.setText("Create New Commands");
        this.titleEl.addClass("textshortcuts-modal-command-editor-hedder");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        const settingDiv = contentEl.createDiv();

        new Setting(settingDiv)
            .setName("Parent Group")
            .addDropdown((dropdown) => {
                dropdown.addOption("--", "----");
                this.plugin.settings.commands.forEach(commanditem => {
                    if (isTSCommandGroup(commanditem)) {
                        dropdown.addOption(commanditem.id, commanditem.name);
                    }
                })
            })

        const DEFAULT_TEXT = {
            id: "",
            name: "",
            enable: true,
            props: {
                type: "",
                value: [""],
            }
        }

        const textArea = contentEl.createEl("textarea");
        textArea.empty();
        textArea.addClass("textshortcuts-modal-command-editor-textarea");
        textArea.rows = 12;
        textArea.setText(JSON.stringify(DEFAULT_TEXT, null, 4));

        contentEl.createEl("br");

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});

    }

    editCommandDisplay(command: TSCommand) {
        this.titleEl.setText(command.name);
        this.titleEl.addClass("textshortcuts-modal-command-editor-hedder");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        const settingDiv = contentEl.createDiv();

        new Setting(settingDiv)
            .setName("Parent Group")
            .addDropdown((dropdown) => {
                dropdown.addOption("--", "----");
                this.plugin.settings.commands.forEach(commanditem => {
                    if (isTSCommandGroup(commanditem)) {
                        dropdown.addOption(commanditem.id, commanditem.name);
                    }
                    const parentGroup = getParentGroup(command, this.plugin.settings.commands);
                    const groupId = parentGroup?.id ?? "--";
                    dropdown.setValue(groupId);
                })
            })
        
        const textArea = contentEl.createEl("textarea");
        textArea.empty();
        textArea.addClass("textshortcuts-modal-command-editor-textarea");
        textArea.rows = 12;
        textArea.setText(JSON.stringify(command, null, 4));

        contentEl.createEl("br");

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});
    }
}