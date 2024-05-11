import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
    {
        unocss: true,
        // formatters: true,
        stylistic: {
            indent: 4, // 4, or 'tab'
            quotes: 'single', // or 'double'
        },
        // eslint 忽略文件
        ignores: [
            '.github/workflows/*.yml',
        ],
    },
    nuxt,
    {
        rules: {
            'no-console': [
                'warn',
                {
                    allow: ['error', 'warn'],
                },
            ],
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    // "varsIgnorePattern": "^_",
                    // "args": "after-used",
                    // "argsIgnorePattern": "^_"
                    argsIgnorePattern: '^',
                },
            ],
            'node/prefer-global/process': ['error', 'always'],
            'antfu/top-level-function': 'off',
            'antfu/if-newline': 'off', // 允许if(a==1) return 1  这种单行的格式
            'curly': ['error', 'multi-line', 'consistent'], // 统一的大括号
            'vue/first-attribute-linebreak': [
                'warn',
                {
                    multiline: 'beside',
                },
            ],
            'vue/html-indent': ['error', 4, {
                alignAttributesVertically: false,
            }],
            'vue/html-closing-bracket-newline': [
                'error',
                {
                    singleline: 'never',
                    multiline: 'never',
                    selfClosingTag: {
                        singleline: 'never',
                        multiline: 'never',
                    },
                },
            ],
        },
    },
)
