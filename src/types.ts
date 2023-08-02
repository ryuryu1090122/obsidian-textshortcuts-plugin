export type MathCommandsSettings = {
	globalsettings: MathCommandsGlobalSettings;
	commands: MathCommandsCommand[];
}

export type MathCommandsGlobalSettings = {
	linebreak: {
		enableAutoLinebreakMathBlock: boolean;
    	enableAutoLinebreakEquation: boolean;
		enableAutoLinebreakParentheses: boolean;
		enableAutoLinebreakMatrix: boolean;
		enableAutoLinebreakIntegral: boolean;
		[key: string]: boolean;
	}
}

export type MathCommandsCommand = {
	id: string;
	name: string;
	enable: boolean;
	property: MathCommandsCommandProperty
	settingstab: MathCommandsCommandSettings
}

export type MathCommandsCommandProperty = {
	type: "single" | "bracket";
	value: string[];
	linebreakstyle?: string;
}

export type MathCommandsCommandSettings = {
	settingstitle: string;
	settingsdesc?: string;
}