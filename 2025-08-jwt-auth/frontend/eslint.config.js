import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
    // 전역 ignore
    globalIgnores(['dist', 'node_modules', 'coverage']),

    // 소스 코드(JS/JSX)
    {
        files: ['**/*.{js,jsx}'],
        ignores: ['**/*.config.*', '**/vite.config.*'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
            globals: { ...globals.browser },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin,
        },

        // 순서: base → react → hooks → import → (마지막에 포맷 충돌 제거 필요시 prettier)
        extends: [
            js.configs.recommended,
            react.configs.recommended, // React 기본 규칙
            reactHooks.configs['recommended-latest'], // Hooks 최신 세트
            importPlugin.configs.recommended, // import 품질
        ],
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                node: { extensions: ['.js', '.jsx'] },
                alias: { map: [['@', './src']], extensions: ['.js', '.jsx'] },
            },
        },
        rules: {
            // React 17+ (Vite): JSX에 React import 불필요
            'react/react-in-jsx-scope': 'off',

            // Fast Refresh 안전
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // import 정리(가독성)
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/newline-after-import': ['warn', { count: 1 }],
            'import/no-duplicates': 'warn',

            'react/prop-types': 'off',

            // 미사용 변수: _로 시작하면 무시 (args/vars 모두)
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },

    // Node 환경 파일(구성/스크립트) 오버라이드
    {
        files: ['**/*.config.*', '**/vite.config.*', '**/eslint.config.*', '**/tailwind.config.*'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.node },
        },
        rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }] },
    },
]);
