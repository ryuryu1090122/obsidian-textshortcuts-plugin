import { Editor } from "obsidian";
import { TSCommandSettingsProperty } from "./settings";


export function inputText(editor: Editor, props: TSCommandSettingsProperty): void {
    let from = editor.getCursor("from");
    let to = editor.getCursor("to");

    switch (props.type) {
        case "single" : {
            let str = props.value[0];
            editor.replaceRange(str, from);
            editor.setCursor({line: from.line, ch: from.ch + str.length});
            break;
        }
        case "paired" : {
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