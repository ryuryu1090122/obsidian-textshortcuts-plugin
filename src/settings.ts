export type TSSettings = {
	global: TSGlobal;
	commands: (TSCommandSettings | TSGroupSettings)[];
}

export type TSGlobal = {
}

export type TSGroupSettings = {
	name: string;
	desc?: string;
	enable: boolean;
	commands: TSCommandSettings[];
}

export type TSCommandSettings = {
	name: string;
	desc?: string;
	icon?: string;
	enable: boolean;
	props: TSCommandSettingsProperty
}

export type TSCommandSettingsProperty = {
	type: "single" | "paired";
	value: string[];
	linebreak: boolean;
}