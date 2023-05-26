/**
 * @fileoverview imports from other modules should be only from public api
 * @author viacheslavorlov
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {isPathRelative} = require('../helpers');
const micromatch = require('micromatch');
const path = require('path');

const PUBLIC_ERROR ='PUBLIC_ERROR'
const TESTING_PUBLIC_ERROR ='PUBLIC_ERROR'


/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	meta: {
		type: null, // `problem`, `suggestion`, or `layout`
		docs: {
			description: 'imports from other modules should be only from public api',
			recommended: false,
			url: null, // URL to the documentation page for this rule
		},
		fixable: 'code', // Or `code` or `whitespace`
		messages: {
			[PUBLIC_ERROR]: 'Абсолютный импорт должен быть только через public api!',
			[TESTING_PUBLIC_ERROR]: 'Данные для тестов необходимо импортировать из publicApi/testing.ts'
		},
		schema: [
			{
				type: 'object',
				properties: {
					alias: {
						type: 'string',
						testFilesPatterns: {
							type: 'array'
						}
					}
				}
			}
		], // Add a schema if the rule has options
	},

	create(context) {

		const {alias = '', testFilesPatterns} = context.options[0] ?? {};

		const layers = {
			'entities': 'entities',
			'features': 'features',
			'pages': 'pages',
			'widgets': 'widgets',
		};

		return {
			ImportDeclaration(node) {

				const value = node.source.value;
				const importTo = alias ? value.replace(`${alias}/`, '') : value;

				if (isPathRelative(importTo)) {
					return;
				}

				const segments = importTo.split('/');
				const layer = segments[0];
				const slice = segments[1];

				if (!layers[layer]) {
					return;
				}

				const isImportNotFromPublicApi = segments.length > 2;
				const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

				if (isImportNotFromPublicApi && !isTestingPublicApi) {
					context.report({
						node,
						messageId: PUBLIC_ERROR,
						fix: fixer => {
							return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
						}

					});
				}

				if (isTestingPublicApi) {
					const currentFilePath = context.getFilename();
					const normalizedPath = path.toNamespacedPath(currentFilePath);

					const isCurrentFileTesting = testFilesPatterns.some(
						pattern => micromatch.isMatch(normalizedPath, pattern)
					);

					if (!isCurrentFileTesting) {
						context.report({node, messageId: TESTING_PUBLIC_ERROR});
					}
				}

			}
		};
	},
};
