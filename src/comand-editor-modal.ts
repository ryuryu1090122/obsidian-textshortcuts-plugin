import { Modal, Setting } from "obsidian";
import MathCommandsPlugin from "./main";
import { MathCommandsCommand } from "./types";

export default class CommandEditorModal extends Modal {
    plugin: MathCommandsPlugin;
    command: null | MathCommandsCommand;

    constructor(plugin: MathCommandsPlugin, commanditem?: MathCommandsCommand) {
        super(plugin.app);
        this.plugin = plugin;
        this.command = commanditem? commanditem: null;
    }

    onOpen() {
        this.command? this.editCommandDisplay(this.command): this.createNewCommandDisplay();
    }

    createNewCommandDisplay() {
        const {containerEl} = this;
        this.titleEl.setText("Create New Command");
    }

    editCommandDisplay(command: MathCommandsCommand) {
        const {containerEl} = this;
        this.titleEl.setText(command.name);
    }
}