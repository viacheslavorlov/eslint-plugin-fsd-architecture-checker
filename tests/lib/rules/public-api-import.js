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
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'entities/Article\'',
			errors: [],
		},
		{
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/Article\'',
			errors: [],
			options: [
				{
					alias: '@'
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\service\\serviceFile.test.ts',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/features/ArticleRating/testing\'',
			errors: [],
			options: [
				{
					alias: '@',
					testFilesPatterns: ['**/*.test.*', '**/*.test.ts', '**/StoreDecorator.tsx']
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\StoreDecorator.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/Article/testing\'',
			errors: [],
			options: [
				{
					alias: '@',
					testFilesPatterns: ['**/*.test.*', '**/*.test.ts', '**/StoreDecorator.tsx']
				}
			]
		}
	],

	invalid: [
		{
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'entities/ArticleRating/api/articleRatingApi\'',
			errors: [{message: 'Абсолютный импорт должен быть только через public api!'}],
		},
		{
			filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/ArticleRating/api/articleRatingApi\'',
			errors: [{message: 'Абсолютный импорт должен быть только через public api!'}],
			options: [
				{
					alias: '@'
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\StoreDecorator.tsx',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/Article/testing/file.ts\'',
			errors: [{message: 'Абсолютный импорт должен быть только через public api!'}],
			options: [
				{
					alias: '@',
					testFilesPatterns: ['**/*.test.*', '**/*.stories.*', 'StoreDecorator.tsx']
				}
			]
		},
		{
			filename: 'C:\\advanced-frontend\\src\\entities\\forbidden.ts',
			code: 'import { useGetArticleRating, useRateArticle } from \'@/entities/Article/testing\'',
			errors: [{message: 'Данные для тестов необходимо импортировать из publicApi/testing.ts'}],
			options: [
				{
					alias: '@',
					testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
				}
			]
		}
	],
});
