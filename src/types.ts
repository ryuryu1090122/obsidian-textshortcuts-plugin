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
	settingtab?: TSSettingTabProps;
	commands: TSCommand[];
}

export type TSCommand = {
	id: string;
	name: string;
	enable: boolean;
	icon?: string;
	props: TSCommandProperty
	settingtab?: TSSettingTabProps
}

export type TSCommandProperty = {
	type: "single" | "bracket";
	value: string[];
	linebreak?: true;
}

export type TSSettingTabProps = {
	title?: string;
	desc?: string;
}