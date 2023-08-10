import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";
import { TSGroup } from "src/textshortcuts";

export default class WithinGroupModal extends Modal {
    private readonly plugin: TSPlugin;
    group: TSGroup;

    constructor(plugin: TSPlugin, group: TSGroup) {
        super(plugin.app);
        this.plugin = plugin;
        this.group = group;
    }

    onOpen() {
        this.createWithinGroupDisplay();
    }

    createWithinGroupDisplay() {
        this.titleEl.setText(this.group.name);
        this.titleEl.addClass("textshortcuts-main-header-center");

        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        this.group.createChildCommandsSetting(contentEl);

        const addButton = contentEl.createEl("button", {"cls": "textshortcuts-modal-within-group-button"});
    }
}