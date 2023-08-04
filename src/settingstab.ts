import { App, PluginSettingTab, Setting, Platform } from 'obsidian';

import TextSummonerPlugin from "./main"
import { TSCommand, TSCommandGroup, isTSCommandGroup } from './types';
import CommandEditorModal from './comand-editor-modal';

export class TSSettingTab extends PluginSettingTab {
	plugin: TextSummonerPlugin;
	app: App;

	constructor(app: App, plugin: TextSummonerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.app = app;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('h1', {text: this.plugin.manifest.name })
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
                console.log("new group");
                }
        ));

		new Setting(containerEl)
			.setName("Reload the plugin")
			.addButton((botton) => botton
				.setIcon("refresh-cw")
				.onClick(async () => {
					await (this.app as any).plugins.disablePlugin(this.plugin.manifest.id);
					await (this.app as any).plugins.enablePlugin(this.plugin.manifest.id);
                    (Platform.isMobile) ? await sleep(600) : await sleep(200);
					(this.app as any).setting.openTabById(this.plugin.manifest.id).display();
					console.log("reload done");
				}
        ));
		

		containerEl.createEl('br');
		containerEl.createEl('h4', { text: 'Commands' });

		if (this.plugin.settings.commands.length) {
            this.plugin.settings.commands.forEach((commanditem) => {
                if (isTSCommandGroup(commanditem)) {
                    let group = commanditem as TSCommandGroup;
                    new Setting(containerEl)
					.setName( (group.settingstab) ? ( (group.settingstab.title) ? group.settingstab.title : group.name ) : group.name )
					.setDesc( (group.settingstab) ? ( (group.settingstab.desc) ? group.settingstab.desc : "" ) : "" )
                    .addButton((button) => button
                        .setIcon("trash-2")
                        .setTooltip("delete")
                        .onClick(() => {})
                    )
                    .addButton((button) => button
                        .setIcon("folder-open")
                        .setTooltip("open")
                        .onClick(() => {})
                    )
                    .addButton((button) => {
                        (group.enable) ? button.setIcon("power") : button.setIcon("power-off");
                        button.onClick(async () => {
                            (group.enable) ? button.setIcon("power-off") : button.setIcon("power");
                            group.enable = !group.enable;
                            await this.plugin.saveData(this.plugin.settings)
                        })
                    })
                } else {
                    let command = commanditem as TSCommand;
                    new Setting(containerEl)
					.setName( (command.settingstab) ? ( (command.settingstab.title) ? command.settingstab.title : command.name ) : command.name )
					.setDesc( (command.settingstab) ? ( (command.settingstab.desc) ? command.settingstab.desc : "" ) : "" )
                    .addButton((button) => button
                        .setIcon("trash-2")
                        .setTooltip("delete")
                        .onClick(() => {})
                    )
                    .addButton((button) => button
                        .setIcon("pencil")
                        .setTooltip("edit")
                        .onClick(async () => {
                            new CommandEditorModal(this.plugin, command).open();
                        })
                    )
                    .addButton((button) => {
                        (command.enable) ? button.setIcon("power") : button.setIcon("power-off");
                        button.onClick(async () => {
                            (command.enable) ? button.setIcon("power-off") : button.setIcon("power");
                            command.enable = !command.enable;
                            await this.plugin.saveData(this.plugin.settings)
                        })
                    }
                )}
            })
		} else {
			containerEl.createEl('h4', { text: 'Oops, no commands have been loaded.' });
			containerEl.createEl('h2', { text: 'Please try using the \"Restore Default Command\" option.' });
			containerEl.createEl('h2', { text: 'To create custom commands: You can create custom commands by editing the data.json file located in the plugin\'s source directory.' });
		}
	}
}