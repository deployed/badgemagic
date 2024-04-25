import globals from 'globals';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { languageOptions: { globals: globals.node } },
  ...compat.extends('standard-with-typescript'),
  pluginReactConfig,
  { ignores: ['*.config.*', '.yarn', '.prettierrc.js', '.expo'] },
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      semi: 'off',
      '@typescript-eslint/semi': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
];
