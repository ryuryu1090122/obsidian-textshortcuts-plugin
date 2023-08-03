export type MathCommandsSettings = {
	globalsettings: MathCommandsGlobalSettings;
	commands: MathCommandsCommand[];
}

export type MathCommandsGlobalSettings = {
	linebreak: MathCommandsGlobalSettingsLinebreak[];
}

export type MathCommandsGlobalSettingsLinebreak = {
	id: string;
	enable: boolean;
	settingstab: MathCommandsSettingsTabProps;
}

export type MathCommandsCommand = {
	id: string;
	name: string;
	enable: boolean;
	icon?: string;
	property: MathCommandsCommandProperty
	settingstab: MathCommandsSettingsTabProps
}

export type MathCommandsCommandProperty = {
	type: "single" | "bracket";
	value: string[];
	linebreakstyle?: string;
}

export type MathCommandsSettingsTabProps = {
	settingstitle: string;
	settingsdesc?: string;
}