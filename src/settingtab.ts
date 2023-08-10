import { App, PluginSettingTab, Setting, Platform } from 'obsidian';

import TSPlugin from "./main"
import { reloadPlugin } from './util';
import CommandEditorModal from './modal/comand-editor-modal';
import GroupEditorModal from './modal/group-editor-modal';
import { TSGroup } from './textshortcuts';

export class TSSettingTab extends PluginSettingTab {
	plugin: TSPlugin;
	app: App;

	constructor(app: App, plugin: TSPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.app = app;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

        containerEl.createEl('h1', {text: this.plugin.manifest.name + " v" + this.plugin.manifest.version});

        containerEl.createEl('br');

        new Setting(containerEl)
			.setName("Create New Command")
			.addButton((botton) => botton
                .setIcon("plus")
				.onClick(async () => {
                    new CommandEditorModal(this.plugin).open();
				}
        ));

        new Setting(containerEl)
            .setName("Create New Group")
            .addButton((botton) => botton
                .setIcon("plus")
                .onClick(async () => {
                    new GroupEditorModal(this.plugin).open();
                }
        ));

		new Setting(containerEl)
			.setName("Reload the plugin")
			.addButton((botton) => botton
				.setIcon("refresh-cw")
				.onClick(async () => {
                    await reloadPlugin(this.app, this.plugin);
					console.log("reload done");
				}
        ))
		
		containerEl.createEl('hr');

        if(this.plugin.commandList.length) {
            this.plugin.commandList.forEach(commanditem => {
                if(TSGroup.isTSGroup(commanditem)) {
                    commanditem.createGroupSetting(containerEl);
                } else {
                    commanditem.createCommandSetting(containerEl);
                }
            })
        }
    }
}