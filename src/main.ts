import { App, Plugin } from 'obsidian';

import { TSSettings } from "./settings"
import { isTSGroupSettings } from "./util"
import { TSSettingTab } from "./settingtab"
import { DEFAULT_COMMANDS, DEFAULT_GLOBAL_SETTINGS } from './default-settings';
import { TSCommand, TSGroup } from './textshortcuts';

const DEFAULT_SETTINGS: TSSettings = {
	global: DEFAULT_GLOBAL_SETTINGS,
	commands: [],
}

export default class TSPlugin extends Plugin {
	app: App;
	settings: TSSettings;
	commandList: (TSCommand | TSGroup)[] = [];

	async onload() {
		await this.loadSettings();

		this.settings.commands.forEach((commanditem, i) => {
			if (isTSGroupSettings(commanditem)) {
				this.commandList.push(new TSGroup(this, i, commanditem))
			} else {
				this.commandList.push(new TSCommand(this, i, commanditem))
			}
		})

		this.commandList.forEach(commanditem => {
			if(TSGroup.isTSGroup(commanditem)) {
				commanditem.createCommands().forEach(command => {
					this.addCommand(command);
				})
			} else {
				this.addCommand(commanditem.createCommand());
			}
		})

		this.addCommand({
			id: "textshortcuts_debug",
			name: "debug",
			callback: () => {
			},
		})

		this.addSettingTab(new TSSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS);
		const jsondata = await this.loadData()

		if (jsondata) {
			this.settings.global = Object.assign(this.settings.global, jsondata["globalsettings"]);
			this.settings.commands = Object.assign(this.settings.commands, jsondata["commands"]);
		} else {
			this.settings.commands = Object.assign(this.settings.commands, DEFAULT_COMMANDS);
			this.saveSettings();
		}

		console.log("data : ", this.settings);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private isVarid(data: any) {

	}
}

