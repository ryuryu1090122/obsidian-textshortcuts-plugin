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
        const {containerEl} = this;
        this.titleEl.setText("Create New Group");
    }

    editGroupDisplay(group: TSCommandGroup) {
        const {containerEl} = this;
        this.titleEl.setText(group.name);
    }
}