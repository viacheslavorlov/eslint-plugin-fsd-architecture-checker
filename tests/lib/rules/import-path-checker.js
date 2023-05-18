/**
 * @fileoverview checks if modules imported according to FSD rules
 * @author viacheslav orlov
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/import-path-checker'),
	RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run('import-path-checker', rule, {
	valid: [
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'../api/articleRatingApi\'',
			errors: [{message: 'В рамках одного модуля импорты должны быть относительны!'}],
			// options: [
			// 	{
			// 		alias: '@'
			// 	}
			// ]
		}
	],

	invalid: [
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/features/ArticleRating/api/articleRatingApi\'',
			errors: [{message: 'В рамках одного модуля импорты должны быть относительны!'}],
			options: [
				{
					alias: '@'
				}
			]
		},
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'features/ArticleRating/api/articleRatingApi\'',
			errors: [{message: 'В рамках одного модуля импорты должны быть относительны!'}],
		},
	],
});
