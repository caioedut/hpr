import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },

  js.configs.recommended,
  {
    rules: {
      'no-control-regex': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      radix: ['warn', 'as-needed'],
    },
  },

  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allow: ['\\.png$', '\\.jpg$', '\\.jpeg$', '\\.gif$', '\\.svg$', '\\.ttf$'],
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    },
  },

  perfectionist.configs['recommended-natural'],
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            type: {
              dotenv: ['^dotenv'],
              runtime: ['^node:', '^deno:', '^bun:', '^std:', '^window:', '^kaluma:', '^workers:'],
            },
            value: {
              dotenv: ['^dotenv'],
              runtime: ['^node:', '^deno:', '^bun:', '^std:', '^window:', '^kaluma:', '^workers:'],
            },
          },
          groups: [
            'dotenv',
            'runtime',
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'side-effect',
            'style',
            'object',
            'unknown',
          ],
          internalPattern: ['^@/'],
          newlinesBetween: 'always',
        },
      ],
    },
  },
);
