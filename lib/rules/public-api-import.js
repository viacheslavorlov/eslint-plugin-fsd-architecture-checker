/**
 * @fileoverview imports from other modules should be only from public api
 * @author viacheslavorlov
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {isPathRelative} = require('../helpers');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	meta: {
		type: null, // `problem`, `suggestion`, or `layout`
		docs: {
			description: 'imports from other modules should be only from public api',
			recommended: false,
			url: null, // URL to the documentation page for this rule
		},
		fixable: null, // Or `code` or `whitespace`
		schema: [
			{
				type: 'object',
				properties: {
					alias: {
						type: 'string'
					}
				}
			}
		], // Add a schema if the rule has options
	},

	create(context) {

		const alias = context.options[0]?.alias || '';

		const layers = {
			'entities': 'entities',
			'features': 'features',
			'pages': 'pages',
			'widgets': 'widgets',
		}

		return {
			ImportDeclaration(node) {

				const value = node.source.value;
				const importTo = alias ? value.replace(`${alias}/`, '') : value;

				if (isPathRelative(importTo)) {
					return;
				}

				const segments = importTo.split('/')
				const layer = segments[0];

				if (!layers[layer]) {
					return;
				}

				const isImportNotFromPublicApi = segments.length > 2;

				if (isImportNotFromPublicApi) {
					context.report(node, 'Абсолютный импорт должен быть только через public api!');
				}
			}
		};
	},
};
