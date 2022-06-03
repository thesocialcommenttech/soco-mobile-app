module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
        'comma-dangle': 'off',
      }
    }
  ]
};
