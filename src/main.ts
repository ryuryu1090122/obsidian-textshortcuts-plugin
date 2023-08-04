import { App, Editor, Plugin, PluginSettingTab, Setting } from 'obsidian';

import { TSCommandProperty, TSSettings, TSCommand, isTSCommandGroup, TSCommandGroup } from "./types"
import { TSSettingTab } from "./settingstab"
import { DEFAULT_COMMANDS, DEFAULT_GLOBAL_SETTINGS } from './default-settings';

const DEFAULT_SETTINGS: TSSettings = {
	global: DEFAULT_GLOBAL_SETTINGS,
	commands: [],
}

export default class TextSummonerPlugin extends Plugin {
	app: App;
	settings: TSSettings;

	async onload() {
		await this.loadSettings();

		this.settings.commands.forEach((commanditem) => {
			if (isTSCommandGroup(commanditem)) {
				let group = commanditem as TSCommandGroup;
				group.commands.forEach((command) => {
					this.addCommand({
						id: command.id,
						name: command.name,
						icon: command.icon,
						editorCheckCallback: (checking, editor) => {
							if (command.enable && group.enable) {
								if (!checking) {
									this.addBracket(editor, command.props);
								}
								return true;
							}
						}
					})
				})} else {
				let command = commanditem as TSCommand;
				this.addCommand({
					id: command.id,
					name: command.name,
					icon: command.icon,
					editorCheckCallback: (checking, editor, ctx) => {
						if (command.enable) {
							if (!checking) {
								this.addBracket(editor, command.props);
							}
							return true;
						}
					}
				})
			}
		})

		this.addCommand({
			id: "textsummoner_debug",
			name: "debug",
			callback: () => {
				this.reload();
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

	async reload() {
		await (this.app as any).plugins.disablePlugin(this.manifest.id);
		await (this.app as any).plugins.enablePlugin(this.manifest.id);
		console.log("reload done");
	}

	private isVarid(data: any) {

	}

	private addBracket(editor: Editor, props: TSCommandProperty): void {
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

				if (props.linebreak) {
					let line = editor.getLine(from.line);
					let before = !!(line.slice(0, from.ch));
					let after = !!(line.slice(to.ch));
	
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

