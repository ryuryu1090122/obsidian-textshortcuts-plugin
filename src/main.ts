import { App, Editor, Plugin, PluginSettingTab, Setting, FileSystemAdapter } from 'obsidian';

import * as fs from 'fs'
import * as path from 'path'

import { version } from "package.json"
import { MathCommandsCommandProperty, MathCommandsSettings } from "./types"
import { DEFAULT_COMMANDS, DEFAULT_GLOBAL_SETTINGS } from './default-settings';

const DEFAULT_SETTINGS: MathCommandsSettings = {
	globalsettings: DEFAULT_GLOBAL_SETTINGS,
	commands: [],
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
				//icon: "dollar-sign",
				editorCheckCallback: (checking, editor, ctx) => {
					if (command.enable) {
						if (!checking) {
							this.addBracket(editor, command.property);
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
		const jsondata = await this.loadData()

		if (jsondata) {
			this.settings.globalsettings = Object.assign(this.settings.globalsettings, jsondata["globalsettings"]);
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

	private addBracket(editor: Editor, props: MathCommandsCommandProperty): void {
		let from = editor.getCursor("from");
		let to = editor.getCursor("to");

		switch (props.type) {
			case "single" : {
				let str = props.value[0];
				editor.replaceRange(str, from);
				editor.setCursor({line: from.line, ch: from.ch + str.length});
				break;
			}
			case "bracket" : {
				let bra = props.value[0];
				let ket = props.value[1];

				if (this.settings.globalsettings.linebreak[props.linebreakstyle as string]) {
					let line = editor.getLine(from.line);
					let before = Boolean(line.slice(0, from.ch));
					let after = Boolean(line.slice(to.ch));
	
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
				} else {
					editor.replaceRange(ket, to);
					editor.replaceRange(bra, from);
					editor.setCursor({ch: from.ch + bra.length, line: from.line});
				}
				break;
			}
			default : {
				break;
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

		let settings = this.plugin.settings;

		containerEl.createEl('h1', {text: 'Math Commands v' + version})

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in $$ ... $$')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakMathBlock)
				.onChange(async (value) => {
					this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakMathBlock = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Equations')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakEquation)
				.onChange(async (value) => {
					this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakEquation = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Parentheses')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakParentheses)
				.onChange(async (value) => {
					this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakParentheses = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Matrix')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakMatrix)
				.onChange(async (value) => {
					this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakMatrix = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));
	
		new Setting(containerEl)
			.setName('Enable Auto Bleaklines in Integral')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakIntegral)
				.onChange(async (value) => {
					this.plugin.settings.globalsettings.linebreak.enableAutoLinebreakIntegral = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));


		containerEl.createEl('h3', { text: '　' });

		if (this.plugin.settings.commands.length) {
			containerEl.createEl('h4', { text: 'The items selected below will be displayed in your Command Palette.' });

			for (let i = 0; i < this.plugin.settings.commands.length; i++) {
				let command = this.plugin.settings.commands[i];
				new Setting(containerEl)
					.setName(command.settingstab.settingstitle)
					.setDesc(command.settingstab.settingsdesc as string)
					.addToggle((toggle) => toggle
						.setValue(command.enable)
						.onChange(async (value) => {
							command.enable = value;
							await this.plugin.saveData(this.plugin.settings)
						}));
			}
		} else {
			containerEl.createEl('h4', { text: 'Oops, no commands have been loaded.' });
			containerEl.createEl('h2', { text: 'Please try using the \"Restore Default Command\" option.' });
			containerEl.createEl('h2', { text: 'To create custom commands: You can create custom commands by editing the data.json file located in the plugin\'s source directory.' });
		}
	}
}
