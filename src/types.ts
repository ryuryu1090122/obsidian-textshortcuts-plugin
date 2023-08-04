export type TSSettings = {
	global: TSGlobal;
	commands: (TSCommand | TSCommandGroup)[];
}

export type TSGlobal = {
}

export type TSCommandGroup = {
	id: string;
	name: string;
	enable: boolean;
	settingstab?: TSSettingsTabProps;
	commands: TSCommand[];
}

export const isTSCommandGroup = (commanditem: any): commanditem is TSCommandGroup => {
	return !!(commanditem as TSCommandGroup)?.commands
}

export type TSCommand = {
	id: string;
	name: string;
	enable: boolean;
	icon?: string;
	props: TSCommandProperty
	settingstab?: TSSettingsTabProps
}

export type TSCommandProperty = {
	type: "single" | "bracket";
	value: string[];
	linebreak?: true;
}

export type TSSettingsTabProps = {
	title?: string;
	desc?: string;
}