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
		enableAutoLinebreakParentheses: true,
		enableAutoLinebreakMatrix: true,
		enableAutoLinebreakIntegral: true,
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

		this.addSettingTab(new MathCommandsSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS);
		this.settings.commands = CommandList;
		Object.assign(this.settings, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}


	private addBracket(editor: Editor, bra: string, ket: string, mode?: "linebreak"): void {
		let from = editor.getCursor("from");
		let to = editor.getCursor("to");

		switch (mode) {
			case "linebreak":
				let line = editor.getLine(from.line)
				let before = Boolean(line.slice(0, from.ch))
				let after = Boolean(line.slice(to.ch))

				if (editor.somethingSelected()) {

					if (!before && !after) {
						editor.replaceRange("\n" + ket, to)
						editor.replaceRange(bra + "\n", from)
						editor.setCursor({ch: 0, line: from.line + 1})
					}
					else if (before && !after) {
						editor.replaceRange("\n" +  ket, to)
						editor.replaceRange("\n" + bra + "\n", from)
						editor.setCursor({ch: 0, line: from.line + 2})
					}
					else if (!before && after) {
						editor.replaceRange("\n" + ket + "\n", to)
						editor.replaceRange(bra + "\n", from)
						editor.setCursor({ch: 0, line: from.line + 1})
					}
					else if (before && after) {
						editor.replaceRange("\n" + ket + "\n", to)
						editor.replaceRange("\n" + bra + "\n", from)
						editor.setCursor({ch: 0, line: from.line + 2})
					}
					
				} else {

					if (!before && !after) {
						editor.replaceRange("\n\n" + ket, to)
						editor.replaceRange(bra, from)
						editor.setCursor({ch: 0, line: from.line + 1})
					}
					else if (before && !after) {
						editor.replaceRange("\n\n" +  ket, to)
						editor.replaceRange("\n" + bra, from)
						editor.setCursor({ch: 0, line: from.line + 2})
					}
					else if (!before && after) {
						editor.replaceRange("\n\n" + ket + "\n", to)
						editor.replaceRange(bra, from)
						editor.setCursor({ch: 0, line: from.line + 1})
					}
					else if (before && after) {
						editor.replaceRange("\n\n" + ket + "\n", to)
						editor.replaceRange("\n" + bra, from)
						editor.setCursor({ch: 0, line: from.line + 2})
					}
				}

				break;

			default:
				editor.replaceRange(ket, to);
				editor.replaceRange(bra, from);
				editor.setCursor({ch: from.ch + bra.length, line: from.line})
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
			.setName('Enable Auto Bleaklines in Equations')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.linebreak.enableAutoLinebreakEquation)
				.onChange(async (value) => {
					this.plugin.settings.linebreak.enableAutoLinebreakEquation = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Parentheses')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.linebreak.enableAutoLinebreakParentheses)
				.onChange(async (value) => {
					this.plugin.settings.linebreak.enableAutoLinebreakParentheses = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Matrix')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.linebreak.enableAutoLinebreakMatrix)
				.onChange(async (value) => {
					this.plugin.settings.linebreak.enableAutoLinebreakMatrix = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));
	
		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Integral')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.linebreak.enableAutoLinebreakIntegral)
				.onChange(async (value) => {
					this.plugin.settings.linebreak.enableAutoLinebreakIntegral = value;
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
