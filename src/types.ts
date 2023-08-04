export type MathCommandsSettings = {
	globalsettings: MathCommandsGlobalSettings;
	commands: (MathCommandsCommand | MathCommandsCommandGroup)[];
}

export type MathCommandsGlobalSettings = {
}

export type MathCommandsCommandGroup = {
	id: string;
	name: string;
	enable: boolean;
	settingstab?: MathCommandsSettingsTabProps;
	commands: MathCommandsCommand[];
}

export const isMathCommandsCommandGroup = (commanditem: any): commanditem is MathCommandsCommandGroup => {
	return !!(commanditem as MathCommandsCommandGroup)?.commands
}

export type MathCommandsCommand = {
	id: string;
	name: string;
	enable: boolean;
	icon?: string;
	property: MathCommandsCommandProperty
	settingstab?: MathCommandsSettingsTabProps
}

export type MathCommandsCommandProperty = {
	type: "single" | "bracket";
	value: string[];
	linebreak?: true;
}

export type MathCommandsSettingsTabProps = {
	title?: string;
	desc?: string;
}