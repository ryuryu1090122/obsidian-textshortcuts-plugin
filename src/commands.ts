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
	    name: 'Add Math block',
	    enable: true,
	    bra: '$$',
    	ket: '$$',
    	linebreakstyle: 'enableAutoLinebreakMathBlock',
    	settingstitle: 'Add math block',
    	settingsdesc: '$$ ... $$'
    },
    {
        id: 'add-equation-block',
		name: 'Add Equation',
	    enable: true,
	    bra: '\\begin{equation}',
    	ket: '\\end{equation}',
    	linebreakstyle: 'enableAutoLinebreakEquation',
    	settingstitle: 'Add Equation',
    	settingsdesc: '\\begin{ equation } ... \\end{ equation }'
    },
    {
        id: 'add-align-block',
	    name: 'Add Multiple Equations',
	    enable: true,
	    bra: '\\begin{align}',
    	ket: '\\end{align}',
    	linebreakstyle: 'enableAutoLinebreakEquation',
    	settingstitle: 'Add Multiple Equations',
    	settingsdesc: '\\begin{ align } ... \\end{ align }'
    },
    {
        id: 'add-parentheses-block',
	    name: 'Add Parentheses',
	    enable: true,
	    bra: '\\right(',
    	ket: '\\left)',
    	linebreakstyle: '',
    	settingstitle: 'Add Parentheses',
    	settingsdesc: '\\right ( ... \\left )'
    },
    {
        id: 'add-fraction',
        name: 'Add Fraction',
        enable: true,
        bra: '\\frac{',
        ket: '}{}',
        linebreakstyle: '',
        settingstitle: 'Add Fraction',
        settingsdesc: '\\frac{ } { }'
    },
    {
        id: 'Add-pmatrix-block',
        name: 'Add Matrix Parentheses',
        enable: true,
        bra: '\\begin{pmatrix}',
        ket: '\\end{pmatrix}',
        linebreakstyle: 'enableAutoLinebreakMatrix',
        settingstitle: 'Add Matrix Parentheses',
        settingsdesc: '\\begin{ pmatrix } ... \\end{ pmatrix }'
    },
    {
        id: 'Add-bmatrix-block',
        name: 'Add Matrix Brackets',
        enable: true,
        bra: '\\begin{bmatrix}',
        ket: '\\end{bmatrix}',
        linebreakstyle: 'enableAutoLinebreakMatrix',
        settingstitle: 'Add Matrix Brackets',
        settingsdesc: '\\begin{ bmatrix } ... \\end{ bmatrix }'
    },
    {
        id: 'Add-vmatrix-block',
        name: 'Add Matrix Equation',
        enable: true,
        bra: '\\begin{vmatrix}',
        ket: '\\end{vmatrix}',
        linebreakstyle: 'enableAutoLinebreakMatrix',
        settingstitle: 'Add Matrix Equation',
        settingsdesc: '\\begin{ vmatrix } ... \\end{ vmatrix }'
    },
    {
        id: 'Add-integral-block',
        name: 'Add Integral Large',
        enable: true,
        bra: '\\displaystyle \\int',
        ket: 'dx',
        linebreakstyle: 'enableAutoLinebreakIntegral',
        settingstitle: 'Add Integral Large',
        settingsdesc: '\\displaystyle \\int ... dx'
    },
    {
        id: 'Add-defintegral-block',
        name: 'Add Integral Large (definite)',
        enable: true,
        bra: '\\displaystyle \\int_{',
        ket: '}^{}dx',
        linebreakstyle: 'enableAutoLinebreakIntegral',
        settingstitle: 'Add Integral Large',
        settingsdesc: '\\displaystyle \\int_ { ... } ^ { } dx'
    },
    {
        id: 'Add-cases-block',
        name: 'Add Cases',
        enable: true,
        bra: '\\begin{cases}',
        ket: '\\end{cases}',
        linebreakstyle: 'enableAutoLinebreakEquation',
        settingstitle: 'Add Cases',
        settingsdesc: '\\begin{ cases } ... \\end{ cases }'
    },
]