import { Modal, Setting } from "obsidian";
import TextSummonerPlugin from "./main";
import { TSCommand } from "./types";

export default class CommandEditorModal extends Modal {
    plugin: TextSummonerPlugin;
    command: null | TSCommand;

    constructor(plugin: TextSummonerPlugin, commanditem?: TSCommand) {
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

    editCommandDisplay(command: TSCommand) {
        const {containerEl} = this;
        this.titleEl.setText(command.name);
    }
}