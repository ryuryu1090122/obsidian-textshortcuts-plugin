import { context } from 'esbuild';
import {
	App,
	Editor,
	EditorTransaction,
	MarkdownView,
	Modal,
	Notice,
	Plugin, 
	PluginSettingTab,
	Setting,
	editorEditorField,
	Command
} from 'obsidian';

import {} from '@codemirror/state'
import {} from '@codemirror/view'

import {MathCommandsSettings} from "./types"

const DEFAULT_SETTINGS: MathCommandsSettings = {
	enableAddMathBlockCommand: true,
	enableAddEquationBlockCommand: true,
	enableAddAlignBlockCommand: true,
	enableAddParenthesesCommand: true,
	enableAddFracCommand: true
}

export default class MathCommandsPlugin extends Plugin {
	settings: MathCommandsSettings;

	async onload() {
		await this.loadSettings();
		
		let commands: Command[] = [
			{
				id: 'add-math-block',
				name: 'Add math block',
				editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
					if (this.settings.enableAddMathBlockCommand) {
						if (!checking) {
	
							editorEditorField
						}
						return true;
					}
				}
			},

			{
				id: 'add-equation-block',
				name: 'Add equation block',
				editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
					if (this.settings.enableAddEquationBlockCommand) {
						if (!checking) {
	
						}
						return true;
					}
				}
			},

			{
				id: 'add-align-block',
				name: 'Add multiple equations block',
				editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
					if (this.settings.enableAddAlignBlockCommand) {
						if (!checking) {
	
						}
						return true;
					}
				}
			},

			{
				id: 'add-parentheses-block',
				name: 'Add parentheses block',
				editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
					if (this.settings.enableAddParenthesesCommand) {
						if (!checking) {
	
						}
						return true;
					}
				}
			},

			{
				id: 'add-frac',
				name: 'Add frac',
				editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
					if (this.settings.enableAddFracCommand) {
						if (!checking) {
	
						}
						return true;
					}
				}
			}
		]

		this.addCommands(commands)

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MathCommandsSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private addCommands(commands: Command[]): void {
		for (let i = 0; i < commands.length; i++) {
			this.addCommand(commands[i])
		}
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
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

		containerEl.createEl('h2', { text: 'Math Commands for Obsidian - Settings' });

		new Setting(containerEl)
			.setName('$$ ... $$')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableAddMathBlockCommand)
				.onChange(async (value) => {
					this.plugin.settings.enableAddMathBlockCommand = value;
					await this.plugin.saveData(this.plugin.settings);
					this.display();
				}));

		new Setting(containerEl)
			.setName('begin{equation} ... end{equation}')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableAddEquationBlockCommand)
				.onChange(async (value) => {
					this.plugin.settings.enableAddEquationBlockCommand = value;
					await this.plugin.saveData(this.plugin.settings);
				}));

		new Setting(containerEl)
			.setName('begin{align} ... end{align}')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableAddAlignBlockCommand)
				.onChange(async (value) => {
					this.plugin.settings.enableAddAlignBlockCommand = value;
					await this.plugin.saveData(this.plugin.settings);
				}));

		new Setting(containerEl)
			.setName('\\right( ... \\left)')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableAddParenthesesCommand)
				.onChange(async (value) => {
					this.plugin.settings.enableAddParenthesesCommand = value;
					await this.plugin.saveData(this.plugin.settings);
				}));

		new Setting(containerEl)
			.setName('\\frac{}{}')
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableAddFracCommand)
				.onChange(async (value) => {
					this.plugin.settings.enableAddFracCommand = value;
					await this.plugin.saveData(this.plugin.settings);
				}));

	}
}
