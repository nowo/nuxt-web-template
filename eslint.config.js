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
        ignores:[]
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
        },
    },
)
