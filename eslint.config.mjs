import js from '@eslint/js';
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
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
