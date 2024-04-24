import globals from 'globals'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  { languageOptions: { globals: globals.node } },
  ...compat.extends('standard-with-typescript'),
  pluginReactConfig,
  { ignores: ['*.config.*', '.yarn', '.prettierrc.js'] },
  {
      plugins: {
        prettier
      },
      rules: {
        'semi': 'off',
        '@typescript-eslint/semi': 'off',
        'prettier/prettier': 'error',
    } 
  }
] 
