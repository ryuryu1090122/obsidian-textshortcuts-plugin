import { App } from "obsidian";
import { TSCommandSettings, TSGroupSettings } from "./settings";
import TSPlugin from "./main";

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function reloadPlugin(app: App, plugin: TSPlugin, sleepTime: number) {
    await (app as any).plugins.disablePlugin(plugin.manifest.id);
    await (app as any).plugins.enablePlugin(plugin.manifest.id);
    await sleep(sleepTime);
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