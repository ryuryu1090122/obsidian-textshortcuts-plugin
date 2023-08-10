import { App, Platform } from "obsidian";
import { TSCommandSettings, TSGroupSettings } from "./settings";
import TSPlugin from "./main";

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function reloadPlugin(app: App, plugin: TSPlugin) {
    await (app as any).plugins.disablePlugin(plugin.manifest.id);
    await (app as any).plugins.enablePlugin(plugin.manifest.id);
    Platform.isMobile? await sleep(400): await sleep(100);
    (app as any).setting.openTabById(plugin.manifest.id).display();
}

export function isTSGroupSettings(commanditem: TSCommandSettings | TSGroupSettings): commanditem is TSGroupSettings {
    return (commanditem as TSGroupSettings).commands !== undefined;
}

export function getSettingsByIndex(plugin: TSPlugin, index: number[]): TSCommandSettings | TSGroupSettings {
    let result: TSCommandSettings | TSGroupSettings = plugin.settings.commands[index.shift() as number];

    index.forEach(i => {
        if (isTSGroupSettings(result)) {
            result = result.commands[i]
        }
    })

    return result
}