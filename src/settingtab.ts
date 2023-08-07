import { App, PluginSettingTab, Setting, Platform } from 'obsidian';

import TSPlugin from "./main"
import { TSCommand, TSCommandGroup } from './types';
import { isTSCommandGroup, reloadPlugin, sleep } from './util';
import CommandEditorModal from './modal/comand-editor-modal';
import GroupEditorModal from './modal/group-editor-modal';
import WithinGroupModal from './modal/within-group-modal';

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
                    (Platform.isMobile) ? await reloadPlugin(this.app, this.plugin, 400) : await reloadPlugin(this.app, this.plugin, 100);
					console.log("reload done");
				}
        ))
		
		containerEl.createEl('br');
		containerEl.createEl('h6', {text: 'Commands'});

		if (this.plugin.settings.commands.length) {
            this.plugin.settings.commands.forEach((commanditem) => {
                if (isTSCommandGroup(commanditem)) {
                    let group = commanditem as TSCommandGroup;
                    const groupSetting =
                    new Setting(containerEl)
	    				.setName(group.settingtab? (group.settingtab.title? group.settingtab.title: group.name): group.name)
	    				.setDesc(group.settingtab? (group.settingtab.desc? group.settingtab.desc: ""): "")
                        .addButton((button) => button
                            .setIcon("trash-2")
                            .setTooltip("delete")
                            .onClick(() => {})
                        )
                        .addButton((button) => button
                            .setIcon("folder-open")
                            .setTooltip("open")
                            .onClick(() => {
                                new WithinGroupModal(this.plugin, group).open();
                            })
                        )
                        .addButton((button) => button
                            .setIcon("pencil")
                            .setTooltip("edit")
                            .onClick(async () => {
                                new GroupEditorModal(this.plugin, group).open();
                            })
                        )
                        .addButton((button) => {
                            (group.enable) ? button.setIcon("power") : button.setIcon("power-off");
                            button.onClick(async () => {
                                (group.enable) ? button.setIcon("power-off") : button.setIcon("power");
                                group.enable = !group.enable;
                                await this.plugin.saveData(this.plugin.settings)
                            })
                        });
                    if (group.settingtab?.desc) {
                        groupSetting.nameEl.addClass("textshortcuts-settings-item-group-name");
                        groupSetting.descEl.addClass("textshortcuts-settings-item-group-desc");
                    } else {
                        groupSetting.nameEl.addClass("textshortcuts-settings-item-group-name-nodesc");
                    }
                } else {
                    let command = commanditem as TSCommand;
                    const commandSetting =
                    new Setting(containerEl)
				    	.setName(command.settingtab? (command.settingtab.title? command.settingtab.title: command.name): command.name)
				    	.setDesc(command.settingtab? (command.settingtab.desc? command.settingtab.desc: "") : "")
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
                        });
                        if (command.settingtab?.desc) {
                            commandSetting.nameEl.addClass("textshortcuts-settings-item-command-name");
                            commandSetting.descEl.addClass("textshortcuts-settings-item-command-desc");
                        } else {
                            commandSetting.nameEl.addClass("textshortcuts-settings-item-command-name-nodesc");
                        }
                }
            })
		} else {
			containerEl.createEl('h4', { text: 'Oops, no commands have been loaded.' });
			containerEl.createEl('h2', { text: 'Please try using the \"Restore Default Command\" option.' });
			containerEl.createEl('h2', { text: 'To create custom commands: You can create custom commands by editing the data.json file located in the plugin\'s source directory.' });
		}
	}
}