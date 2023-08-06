import { App } from "obsidian";
import { TSCommand, TSCommandGroup } from "./types";
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

export function isTSCommandGroup(commanditem: TSCommand | TSCommandGroup): commanditem is TSCommandGroup {
    return (commanditem as TSCommandGroup).commands !== undefined;
}

export function getParentGroup(command: TSCommand, commands: (TSCommand | TSCommandGroup)[]): null | TSCommandGroup {
    commands.forEach(mCommanditem => {
        if (isTSCommandGroup(mCommanditem)) {
            mCommanditem.commands.forEach(mCommand => {
                if (mCommand.id === command.id) {
                    return mCommanditem;
                }
            })
        }
    })
    return null;
}