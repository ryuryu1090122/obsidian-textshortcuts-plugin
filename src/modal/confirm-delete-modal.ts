import { Modal, Setting } from "obsidian";
import TSPlugin from "../main";

export default class ConfirmDeleteModal extends Modal {
    plugin: TSPlugin;

    constructor(plugin: TSPlugin, msg: string) {
        super(plugin.app);
        this.plugin = plugin;
    }

    onOpen() {
    }
}