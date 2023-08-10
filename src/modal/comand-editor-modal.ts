import { Modal } from "obsidian";
import TSPlugin from "../main";
import { TSCommand, TSGroup } from "src/textshortcuts";
import { reloadPlugin } from "src/util";
import { TSCommandSettings, TSGroupSettings } from "src/settings";

export default class CommandEditorModal extends Modal {
    plugin: TSPlugin;
    command: TSCommand | null;

    constructor(plugin: TSPlugin, command?: TSCommand) {
        super(plugin.app);
        this.plugin = plugin;
        this.command = command || null;
    }

    onOpen() {
        const {contentEl} = this;
        contentEl.empty();

        contentEl.createEl("br");

        // Make Components

        let label1 = createEl("label", {"text": "parent group : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let dropdown1 = createEl("select", {"cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        dropdown1.id = "dropdown1"
        label1.htmlFor = "dropdown1"
        let div1 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div1.appendChild(label1);
        div1.appendChild(dropdown1);

        let label2 = createEl("label", {"text": "name : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let input2 = createEl("input", {"type": "text", "placeholder": "name", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        input2.id = "input2"
        label2.htmlFor = "input2"
        let div2 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div2.appendChild(label2);
        div2.appendChild(input2)

        let label3 = createEl("label", {"text": "description : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let input3 = createEl("input", {"type": "text", "placeholder": "description", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        input3.id = "input3"
        label3.htmlFor = "input3"
        let div3 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div3.appendChild(label3);
        div3.appendChild(input3);

        let label4 = createEl("label", {"text": "icon? : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let input4 = createEl("input", {"type": "text", "placeholder": "Lucid icon name (optional)", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        input4.id = "input4"
        label4.htmlFor = "input4"
        let div4 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div4.appendChild(label4);
        div4.appendChild(input4);

        contentEl.createEl("hr", {"cls": "textshortcuts-main-hr"});

        let label5 = createEl("label", {"text": "shortcut type : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let dropdown5 = createEl("select", {"cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        dropdown5.id = "dropdown5"
        label5.htmlFor = "dropdown5"
        let div5 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div5.appendChild(label5);
        div5.appendChild(dropdown5);

        let label6 = createEl("label", {"text": "start : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let input6 = createEl("input", {"type": "text", "placeholder": "start", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        input6.id = "input6"
        label6.htmlFor = "input6"
        let div6 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div6.appendChild(label6);
        div6.appendChild(input6);

        let label7 = createEl("label", {"text": "end : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let input7 = createEl("input", {"type": "text", "placeholder": "end", "cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        input7.id = "input7"
        label7.htmlFor = "input7"
        let div7 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div7.appendChild(label7);
        div7.appendChild(input7);

        contentEl.createEl("hr", {"cls": "textshortcuts-main-hr"});

        let label8 = createEl("label", {"text": "line break : ","cls": "textshortcuts-flex-default textshortcuts-flex-modal-leftitem textshortcuts-modal-command-editor-labels"});
        let dropdown8 = createEl("select", {"cls": "textshortcuts-flex-default textshortcuts-flex-modal-rightitem"});
        dropdown8.id = "dropdown8"
        label8.htmlFor = "dropdown8"
        let div8 = contentEl.createDiv({"cls": "textshortcuts-flex-container-1"});
        div8.appendChild(label8);
        div8.appendChild(dropdown8);

        const OKButton = contentEl.createEl("button", {"text": "OK", "cls": "textshortcuts-modal-command-editor-button"});

        // Initialize Components 1st step

        dropdown1.options.add(new Option("----", "none"));
        this.plugin.commandList.forEach((commanditem, index) => {
                if (TSGroup.isTSGroup(commanditem)) {
                    let option = new Option(commanditem.name, index.toString());
                    dropdown1.options.add(option);
                }
        })
        dropdown1.options.selectedIndex = 0;
        var dropdown1FirstValue: number;    // For checking whether this box has changed. Should be used by OKButton

        dropdown5.options.add(new Option("single", "single"));
        dropdown5.options.add(new Option("paired", "paired"));
        dropdown5.selectedIndex = 1;

        dropdown5.addEventListener("change", () => {
            let option = dropdown5.options[dropdown5.selectedIndex]
            switch (option.value) {
                case "single": {
                    input7.disabled = true;
                    break;
                }
                case "paired": {
                    input7.disabled = false;
                    break;
                }
            }
        })

        dropdown8.options.add(new Option("true", "true"));
        dropdown8.options.add(new Option("false", "false"));
        dropdown8.options.selectedIndex = 0;

        // Initialize Components 2nd step

        if (this.command) {
            this.titleEl.setText("Edit Command");
            this.titleEl.addClass("textshortcuts-main-header-center");

            if (this.command.parentGroup) {
                dropdown1.options.selectedIndex = this.command.parentGroup.index + 1;
            }
            dropdown1FirstValue = dropdown1.options.selectedIndex;

            input2.value = this.command.name;

            if (this.command.desc) {
                input3.value = this.command.desc;
            }

            if (this.command.icon) {
                input4.value = this.command.icon;
            }

            dropdown5.value = this.command.type;

            switch (this.command.type) {
                case "single": {
                    input6.value = this.command.value[0];
                    break;
                }
                case "paired": {
                    input6.value = this.command.value[0];
                    input7.value = this.command.value[1];
                    break;
                }
            }

            dropdown8.value = this.command.linebreak.toString()

            OKButton.addEventListener("click", async () => {
                let command = this.command as TSCommand;
                command.name = input2.value;
                command.desc = input3.value;
                command.icon = input4.value;
                command.type = (dropdown5.value as "single" | "paired");
                switch (command.type) {
                    case "single": {
                        command.value = [input6.value];
                        break;
                    }
                    case "paired": {
                        command.value = [input6.value, input7.value];
                        break;
                    }
                }
                command.linebreak = JSON.parse(dropdown8.value);

                if (dropdown1FirstValue !== dropdown1.options.selectedIndex) {
                    let index = Number(dropdown1.options[dropdown1.selectedIndex].value);
                    console.log("aaa", index);
                    command.migrate(index);
                }

                this.plugin.saveSettings();
                this.close();
                await reloadPlugin(this.app, this.plugin);
            })

        } else {
            this.titleEl.setText("Create New Command");
            this.titleEl.addClass("textshortcuts-main-header-center");

            dropdown1FirstValue = dropdown1.options.selectedIndex;

            OKButton.addEventListener("click", async () => {
                const setting: TSCommandSettings = {
                    name: input2.value,
                    desc: input3.value,
                    icon: input4.value,
                    enable: true,
                    props: {
                        type: (dropdown5.value as "single" | "paired"),
                        value: (dropdown5.value === "single")? [input6.value]: [input6.value, input7.value],
                        linebreak: JSON.parse(dropdown8.value)
                    }
                }

                if (dropdown1FirstValue === dropdown1.options.selectedIndex) {
                    this.plugin.settings.commands.push(setting);
                } else {
                    let index = Number(dropdown1.options[dropdown1.selectedIndex].value);
                    (this.plugin.settings.commands[index] as TSGroupSettings).commands.push(setting);
                }

                this.plugin.saveSettings();
                this.close();
                await reloadPlugin(this.app, this.plugin);
            })
        }

        let option = dropdown5.options[dropdown5.selectedIndex]
        switch (option.value) {
            case "single": {
                input7.disabled = true;
                break;
            }
            case "paired": {
                input7.disabled = false;
                break;
            }
        }
    }
}