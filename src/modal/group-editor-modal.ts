import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";
import { TSCommand, TSCommandGroup } from "../types";

export default class GroupEditorModal extends Modal {
    plugin: TSPlugin;
    group: null | TSCommandGroup;

    constructor(plugin: TSPlugin, commanditem?: TSCommandGroup) {
        super(plugin.app);
        this.plugin = plugin;
        this.group = commanditem? commanditem: null;
    }

    onOpen() {
        this.group? this.editGroupDisplay(this.group): this.createNewGroupDisplay();
    }

    createNewGroupDisplay() {
        this.titleEl.setText("Create New Group");
        this.titleEl.addClass("textshortcuts-main-header-center");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        const DEFAULT_TEXT = {
            id: "",
            name: "",
            enable: true,
            commands: []
        }

        const textArea = contentEl.createEl("textarea");
        textArea.empty();
        textArea.addClass("textshortcuts-modal-json-textarea");
        textArea.rows = 8;
        textArea.setText(JSON.stringify(DEFAULT_TEXT, null, 4));

        contentEl.createEl("br");

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});
    }

    editGroupDisplay(group: TSCommandGroup) {
        this.titleEl.setText("Edit " + group.name);
        this.titleEl.addClass("textshortcuts-main-header-center");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        const textArea = contentEl.createEl("textarea");
        textArea.empty();
        textArea.addClass("textshortcuts-modal-json-textarea");
        textArea.rows = 12;
        textArea.setText(JSON.stringify(group, null, 4));

        contentEl.createEl("br");

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});
    }
}