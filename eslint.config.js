import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  preprocessors: {
    '**/*.ts': '@typescript-eslint/parser',
  },
});

export default [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
