import js from '@eslint/js';

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                document: 'readonly',
                window: 'readonly',
            },
        },
        plugins: {
            js,
        },
        rules: {
            ...js.configs.recommended.rules,
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
        },
    },
];
