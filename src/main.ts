import {
	App,
	Editor,
	Plugin, 
	PluginSettingTab,
	Setting,
} from 'obsidian';

import { version } from "package.json"
import { MathCommandsSettings } from "./types"
import { CommandList } from './commands';

const DEFAULT_SETTINGS: MathCommandsSettings = {
	linebreak: {
		enableAutoLinebreakMathBlock: true,
		enableAutoLinebreakEquation: true,
	},

	commands: []
}

export default class MathCommandsPlugin extends Plugin {
	app: App;
	settings: MathCommandsSettings;

	async onload() {
		await this.loadSettings();

		for (let i = 0; i < this.settings.commands.length; i++) {
			let command = this.settings.commands[i];
			this.addCommand({
				id: command.id,
				name: command.name,
				editorCheckCallback: (checking, editor, ctx) => {
					if (command.enable) {
						if (!checking) {
							if (this.settings.linebreak[command.linebreakstyle]) {
								this.addBracket(editor, command.bra, command.ket, "linebreak");
							} else {
								this.addBracket(editor, command.bra, command.ket)
							}
						}
						return true;
					}
				},
			})
		}

		this.addCommand({
			id: "debug",
			name: "debug",
			callback: () => {
				console.log("command length : ", CommandList[0])
			},
		})

		this.addSettingTab(new MathCommandsSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		console.log("loadsettings debug : ", CommandList)
		this.settings = Object.assign({}, DEFAULT_SETTINGS);
		this.settings.commands = CommandList;
		Object.assign(this.settings, await this.loadData());

		console.log("post loadsettings debug : ", this.settings)
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}


	private addBracket(editor: Editor, bra: string, ket: string, mode?: "linebreak"): void {
		let from = editor.getCursor("from");
		let to = editor.getCursor("to");

		switch (mode) {
			case "linebreak":
				editor.replaceRange("\n" + ket + "\n", to);
				editor.replaceRange("\n" + bra + "\n", from);
				if (from.line == to.line && from.ch == to.ch) {
						editor.setCursor(from.line + 2, 0);
				} else {
					editor.setCursor(to.line + 3, ket.length);
				}
				break;

			default:
				editor.replaceRange(ket, to);
				editor.replaceRange(bra, from);
				if (from.line == to.line) {
					if (from.ch == to.ch) {
						editor.setCursor(from.line, from.ch + bra.length);
					} else {
						editor.setCursor(to.line, to.ch + bra.length + ket.length);
					}
				} else {
						editor.setCursor(to.line, to.ch + ket.length);
				}
		}
	}
}

class MathCommandsSettingTab extends PluginSettingTab {
	plugin: MathCommandsPlugin;

	constructor(app: App, plugin: MathCommandsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('h1', {text: 'Math Commands v' + version})

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in $$ ... $$')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.linebreak.enableAutoLinebreakMathBlock)
				.onChange(async (value) => {
					this.plugin.settings.linebreak.enableAutoLinebreakMathBlock = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in \\begin{} ... \\end{}')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.linebreak.enableAutoLinebreakEquation)
				.onChange(async (value) => {
					this.plugin.settings.linebreak.enableAutoLinebreakEquation = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		containerEl.createEl('h3', { text: '　' });

		containerEl.createEl('h4', { text: 'The items selected below will be displayed in your Command Palette.' });

		for (let i = 0; i < this.plugin.settings.commands.length; i++) {
			let command = this.plugin.settings.commands[i];
			new Setting(containerEl)
				.setName(command.settingstitle)
				.setDesc(command.settingsdesc)
				.addToggle((toggle) => toggle
					.setValue(command.enable)
					.onChange(async (value) => {
						this.plugin.settings.commands[i].enable = value;
						await this.plugin.saveData(this.plugin.settings)
					}));
		}
	}
	
}
