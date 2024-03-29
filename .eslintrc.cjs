module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts', '*.js', '*.jsx'],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
  rules: {
    'no-undef': 'off',
    'comma-dangle': 'off',
    'prettier/prettier': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off'
  }
};
