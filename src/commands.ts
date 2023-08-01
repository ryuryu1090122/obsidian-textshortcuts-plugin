import { MathCommand } from "./types";

/*  Templete

    {
        id: '',
        name: '',
        enable: true,
        bra: '',
        ket: '',
        linebreakstyle: '',
        settingstitle: '',
        settingsdesc: ''
    },

 */

export const CommandList: MathCommand[] = [
    {
        id: 'add-math-block',
	    name: 'Add math block',
	    enable: true,
	    bra: '$$',
    	ket: '$$',
    	linebreakstyle: 'enableAutoLinebreakMathBlock',
    	settingstitle: 'Add math block',
    	settingsdesc: '$$ ... $$'
    },
    {
        id: 'add-equation-block',
		name: 'Add equation block',
	    enable: true,
	    bra: '\\begin{equation}',
    	ket: '\\end{equation}',
    	linebreakstyle: 'enableAutoLinebreakEquation',
    	settingstitle: 'Add equation block',
    	settingsdesc: '\\begin{ equation } ... \\end{ equation }'
    },
    {
        id: 'add-align-block',
	    name: 'Add multiple equations block',
	    enable: true,
	    bra: '\\begin{align}',
    	ket: '\\end{align}',
    	linebreakstyle: 'enableAutoLinebreakEquation',
    	settingstitle: 'Add multiple equations block',
    	settingsdesc: '\\begin{ align } ... \\end{ align }'
    },
    {
        id: 'add-parentheses-block',
	    name: 'Add parentheses block',
	    enable: true,
	    bra: '\\right(',
    	ket: '\\left)',
    	linebreakstyle: '',
    	settingstitle: 'Add parentheses block',
    	settingsdesc: '\\right ( ... \\left )'
    },
    {
        id: 'add-fraction',
        name: 'Add fraction',
        enable: true,
        bra: '\\frac{',
        ket: '}{}',
        linebreakstyle: '',
        settingstitle: 'Add fractions',
        settingsdesc: '\\frac{ } { }'
    },
]