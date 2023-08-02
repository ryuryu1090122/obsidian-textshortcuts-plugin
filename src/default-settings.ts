import { MathCommandsCommand, MathCommandsGlobalSettings } from "./types";

export const DEFAULT_GLOBAL_SETTINGS: MathCommandsGlobalSettings = {
	linebreak: {
		enableAutoLinebreakMathBlock: true,
		enableAutoLinebreakEquation: true,
		enableAutoLinebreakParentheses: true,
		enableAutoLinebreakMatrix: true,
		enableAutoLinebreakIntegral: true,
	}
}

/*  Templete
    {
        id: '',
        name: '',
        enable: true,
        property: {
            type: '',
            value: [],
            linebreakstyle: ''
        },
        settingstab: {
            settingstitle: '',
            settingsdesc: ''
        }
    },
 */

export const DEFAULT_COMMANDS: MathCommandsCommand[] = [
    {
        id: 'add-math-block',
	    name: 'Add Math block',
	    enable: true,
        property: {
            type: 'bracket',
            value: ['$$', '$$'],
            linebreakstyle: 'enableAutoLinebreakMathBlock'
        },
        settingstab: {
            settingstitle: 'Add math block',
    	    settingsdesc: '$$ ... $$'
        }
    },
    {
        id: 'add-equation-block',
		name: 'Add Equation',
	    enable: true,
        property: {
            type: 'bracket',
            value: ['\\begin{equation}', '\\end{equation}'],
            linebreakstyle: 'enableAutoLinebreakEquation'
        },
    	settingstab: {
            settingstitle: 'Add Equation',
    	    settingsdesc: '\\begin{ equation } ... \\end{ equation }'
        }
    },
    {
        id: 'add-align-block',
	    name: 'Add Multiple Equations',
	    enable: true,
        property: {
            type: 'bracket',
            value: ['\\begin{align}', '\\end{align}'],
            linebreakstyle: 'enableAutoLinebreakEquation'
        },
    	settingstab: {
            settingstitle: 'Add Multiple Equations',
    	    settingsdesc: '\\begin{ align } ... \\end{ align }'
        }
    },
    {
        id: 'add-parentheses-block',
	    name: 'Add Parentheses',
	    enable: true,
        property: {
            type: 'bracket',
            value: ['\\right(', '\\left)'],
        },
    	settingstab: {
            settingstitle: 'Add Parentheses',
    	    settingsdesc: '\\right ( ... \\left )'
        }
    },
    {
        id: 'add-fraction',
        name: 'Add Fraction',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\frac{', '}{}'],
        },
        settingstab: {
            settingstitle: 'Add Fraction',
            settingsdesc: '\\frac{ } { }'
        }
    },
    {
        id: 'Add-pmatrix-block',
        name: 'Add Matrix Parentheses',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\begin{pmatrix}', '\\end{pmatrix}'],
            linebreakstyle: 'enableAutoLinebreakMatrix'
        },
        settingstab: {
            settingstitle: 'Add Matrix Parentheses',
            settingsdesc: '\\begin{ pmatrix } ... \\end{ pmatrix }'
        }
    },
    {
        id: 'Add-bmatrix-block',
        name: 'Add Matrix Brackets',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\begin{bmatrix}', '\\end{bmatrix}'],
            linebreakstyle: 'enableAutoLinebreakMatrix'
        },
        settingstab: {
            settingstitle: 'Add Matrix Brackets',
            settingsdesc: '\\begin{ bmatrix } ... \\end{ bmatrix }'
        }
    },
    {
        id: 'Add-vmatrix-block',
        name: 'Add Matrix Equation',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\begin{vmatrix}', '\\end{vmatrix}'],
            linebreakstyle: 'enableAutoLinebreakMatrix'
        },
        settingstab: {
            settingstitle: 'Add Matrix Equation',
            settingsdesc: '\\begin{ vmatrix } ... \\end{ vmatrix }'
        }
    },
    {
        id: 'Add-integral-block',
        name: 'Add Integral Large',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\displaystyle \\int', 'dx'],
            linebreakstyle: 'enableAutoLinebreakIntegral'
        },
        settingstab: {
            settingstitle: 'Add Integral Large',
            settingsdesc: '\\displaystyle \\int ... dx'
        }
    },
    {
        id: 'Add-defintegral-block',
        name: 'Add Integral Large (definite)',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\displaystyle \\int_{}^{}', 'dx'],
            linebreakstyle: 'enableAutoLinebreakIntegral'
        },
        settingstab: {
            settingstitle: 'Add Integral Large',
            settingsdesc: '\\displaystyle \\int_ { ... } ^ { } dx'
        }
    },
    {
        id: 'Add-cases-block',
        name: 'Add Cases',
        enable: true,
        property: {
            type: 'bracket',
            value: ['\\begin{cases}', '\\end{cases}'],
            linebreakstyle: 'enableAutoLinebreakEquation'
        },
        settingstab: {
            settingstitle: 'Add Cases',
            settingsdesc: '\\begin{ cases } ... \\end{ cases }'
        }
    },
]