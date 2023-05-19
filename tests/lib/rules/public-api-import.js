/**
 * @fileoverview imports from other modules should be only from public api
 * @author viacheslavorlov
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/public-api-import'),
	RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run('public-api-import', rule, {
	valid: [
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'entities/Article\'',
			errors: [],
		},
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/Article\'',
			errors: [],
			options: [
				{
					alias: '@'
				}
			]
		}
	],

	invalid: [
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'entities/ArticleRating/api/articleRatingApi\'',
			errors: [{message: 'Абсолютный импорт должен быть только через public api!'}],
		},
		{
			filename: 'C:\\ulbi-advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/ArticleRating/api/articleRatingApi\'',
			errors: [{message: 'Абсолютный импорт должен быть только через public api!'}],
			options: [
				{
					alias: '@'
				}
			]
		}
	],
});
