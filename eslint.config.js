// eslint.config.js
import expoConfig from 'eslint-config-expo/flat';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // Unnecessary brackets in jsx props e.g {"test"}
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
      // Jsx props sorting
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]);
