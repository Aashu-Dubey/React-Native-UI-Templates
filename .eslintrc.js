module.exports = {
  root: true,
  extends: '@react-native-community',
  // parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint'],
  plugins: ['react-hooks'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
