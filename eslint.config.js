const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  preprocessors: {
    '**/*.ts': '@typescript-eslint/parser',
  },
});

module.exports = [
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
