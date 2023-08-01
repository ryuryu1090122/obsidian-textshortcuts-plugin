export type MathCommandsSettings = {
	linebreak: {
		enableAutoLinebreakMathBlock: boolean;
    	enableAutoLinebreakEquation: boolean;
		[key: string]: boolean;
	}
	commands: MathCommand[]
}

export type MathCommand = {
	id: string;
	name: string;
	enable: boolean;
	bra: string;
	ket: string;
	linebreakstyle: string;
	settingstitle: string;
	settingsdesc: string;
}