/**
 * @fileoverview restricts imports from higer layers to lower layers
 * @author viacheslav orlov
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/layers-imports-order'),
	RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run('layers-imports-order', rule, {
	valid: [
		{
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'entities/Article\'',
			errors: [],
		},
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/Article\'',
			errors: [],
			options: [
				{
					alias: '@'
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import React from \'react\'',
			errors: [],
			options: [
				{
					alias: '@'
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { StateSchema } from \'@/app/StoreProvider\'',
			errors: [],
			options: [
				{
					alias: '@',
					ignoreImportPatterns: ['**/StoreProvider']
				}
			]
		},
	],

	invalid: [
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { ArticleRating } from \'@/features/Article\'',
			errors: [
				{message: 'Слой может импортировать в себя только нижележащие слои (исключение - "shared" и "entities")'}
			],
			options: [
				{
					alias: '@',
					ignoreImportPatterns: ['**/StoreProvider']
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { ArticleAdd } from \'@/widgets/Article\'',
			errors: [
				{message: 'Слой может импортировать в себя только нижележащие слои (исключение - "shared" и "entities")'}
			],
			options: [
				{
					alias: '@',
					ignoreImportPatterns: ['**/StoreProvider']
				}
			]
		},
	],
});
