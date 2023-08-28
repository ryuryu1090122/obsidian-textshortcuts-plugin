import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";
import { TSGroup } from "src/command-objects";

export default class GroupEditorModal extends Modal {
    plugin: TSPlugin;
    group: TSGroup | null;

    constructor(plugin: TSPlugin, group?: TSGroup) {
        super(plugin.app);
        this.plugin = plugin;
        this.group = group || null;
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

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});
    }

    editGroupDisplay(group: TSGroup) {
        this.titleEl.setText("Edit " + group.name);
        this.titleEl.addClass("textshortcuts-main-header-center");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});
    }
}