// @ts-check
import eslint from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: ['out/**', '.astro/**', 'coverage/**', 'node_modules/**'],
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  eslintPluginAstro.configs.recommended,

  {
    files: ['*.{js,mjs,cjs,mts}', 'postcss.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['postcss.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
])
