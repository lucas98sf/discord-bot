module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	parserOptions: {
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	rules: {
		'no-console': 'error',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'no-magic-numbers': 'error',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-magic-numbers': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false,
			},
		],
	},
	ignorePatterns: ['**/*.js', '**/*.test.ts', '**/*.d.ts'],
};
