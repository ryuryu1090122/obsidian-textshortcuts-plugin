import { App, Editor, Plugin, PluginSettingTab, Setting, FileSystemAdapter } from 'obsidian';

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
				icon: "dollasign",
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

	private isVarid(data: any) {

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

				if (this.isLinebreak(props.linebreakstyle as string)) {
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

	private isLinebreak(linebreakstyle: string) : boolean {
		for (let i = 0; i < this.settings.globalsettings.linebreak.length; i++) {
			if (this.settings.globalsettings.linebreak[i].id == linebreakstyle && this.settings.globalsettings.linebreak[i].enable) {
				return true;
			}
		}
		return false;
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

		if (this.plugin.settings.globalsettings.linebreak.length) {
			containerEl.createEl('h4', { text: 'Linebreak Settings' });

			for (let i = 0; i < this.plugin.settings.globalsettings.linebreak.length; i++) {
				let linebreaks = this.plugin.settings.globalsettings.linebreak[i];
				new Setting(containerEl)
				.setName(linebreaks.settingstab.settingstitle)
				.setDesc( (linebreaks.settingstab.settingsdesc) ? linebreaks.settingstab.settingsdesc : "")
				.addToggle((toggle) => toggle
					.setValue(this.plugin.settings.globalsettings.linebreak[i].enable)
					.onChange(async (value) => {
						this.plugin.settings.globalsettings.linebreak[i].enable = value;
						await this.plugin.saveData(this.plugin.settings);
						this.display();
					}));
			}
		} else {
			
		}

		containerEl.createEl('h3', { text: '　' });

		if (this.plugin.settings.commands.length) {
			containerEl.createEl('h4', { text: 'The items selected below will be displayed in your Command Palette.' });

			for (let i = 0; i < this.plugin.settings.commands.length; i++) {
				let command = this.plugin.settings.commands[i];
				new Setting(containerEl)
					.setName(command.settingstab.settingstitle)
					.setDesc((command.settingstab.settingsdesc) ? command.settingstab.settingsdesc : "")
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
