import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";
import { TSCommand } from "src/textshortcuts";

export default class CommandEditorModal extends Modal {
    plugin: TSPlugin;
    command: TSCommand | null;

    constructor(plugin: TSPlugin, command?: TSCommand) {
        super(plugin.app);
        this.plugin = plugin;
        this.command = command || null;
    }

    onOpen() {
        this.command? this.editCommandDisplay(this.command): this.createNewCommandDisplay();
    }

    createNewCommandDisplay() {
        this.titleEl.setText("Create New Commands");
        this.titleEl.addClass("textshortcuts-main-header-center");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        const settingDiv = contentEl.createDiv();

        new Setting(settingDiv)
            .setName("Parent Group")
            .addDropdown((dropdown) => {
                dropdown.addOption("--", "----");
                /* this.plugin.settings.commands.forEach(commanditem => {
                    if (isTSGroupSettings(commanditem)) {
                        dropdown.addOption(commanditem.id, commanditem.name);
                    }
                }) */
            })

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});

    }

    editCommandDisplay(command: TSCommand) {
        this.titleEl.setText("Edit " + command.name);
        this.titleEl.addClass("textshortcuts-main-header-center");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        let label1 = createEl("label", {"text": "name : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"})
        let input1 = createEl("input", {"type": "text", "placeholder": "name", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"})
        let div1 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"})
        div1.appendChild(label1);
        div1.appendChild(input1)

        let label2 = createEl("label", {"text": "description : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"})
        let input2 = createEl("input", {"type": "text", "placeholder": "name", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"})
        let div2 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"})
        div2.appendChild(label2);
        div2.appendChild(input2)
;
        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});
    }
}