module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    ignorePatterns: ['dist', 'node_modules', 'coverage', '.eslintrc.cjs'],
    plugins: ['react', 'react-hooks', 'react-refresh', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'prettier', // <- Prettier와 충돌 방지
    ],
    settings: {
        react: { version: 'detect' },
    },
    rules: {
        // React 17+ (Vite): JSX에 React import 필요 없음
        'react/react-in-jsx-scope': 'off',

        // React Fast Refresh 안전 규칙 (Vite HMR)
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

        // import 순서 정리
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],

        // 사용하지 않는 변수 경고 (언더스코어로 시작하면 무시)
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },

    overrides: [
        {
            files: ['*.config.*', 'vite.config.*', 'eslint.config.*', 'tailwind.config.*'],
            env: { node: true },
        },
    ],
};
