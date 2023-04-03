/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    // 代码风格
    'indent': ['error', 2, { 'ignoredNodes': ['ConditionalExpression'], 'SwitchCase': 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'block-spacing': ['error', 'always'],
    'comma-spacing': ['error'],
    'func-call-spacing': ['error'],
    'keyword-spacing': ['error'],
    'no-mixed-spaces-and-tabs': ['error'],
    'no-trailing-spaces': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': ['error'],
    'space-before-function-paren': ['error'],
    'space-infix-ops': ['warn'],
    // 代码合理性
    'no-debugger': 'error',
    'getter-return': ['error', { allowImplicit: true }],

    // typescript
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
