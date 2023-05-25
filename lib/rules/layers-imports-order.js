const path = require('path');
const {isPathRelative} = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
	meta: {
		type: null, // `problem`, `suggestion`, or `layout`
		docs: {
			description: 'restricts imports from higer layers to lower layers',
			category: 'no category',
			recommended: false,
			url: null, // URL to the documentation page for this rule
		},
		fixable: null, // Or `code` or `whitespace`
		schema: [
			{
				type: 'object',
				properties: {
					alias: {
						type: 'string',
					},
					ignoreImportPatterns: {
						type: 'array'
					}
				}
			}
		], // Add a schema if the rule has options
	},

	create(context) {
		const layers = {
			'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
			'pages': ['widgets', 'features', 'shared', 'entities'],
			'widgets': ['features', 'shared', 'entities'],
			'features': ['shared', 'entities'],
			'entities': ['shared', 'entities'],
			'shared': ['shared']
		};

		const availableLayers = {
			'app': 'app',
			'entities': 'entities',
			'features': 'features',
			'pages': 'pages',
			'widgets': 'widgets',
			'shared': 'shared'
		};
		const {alias = '', ignoreImportPatterns = []} = context.options[0] ?? {};

		const getCurrentLayer = () => {
			const currentFilePath = context.getFilename();
			const normalizedPath = path.toNamespacedPath(currentFilePath);
			const projectPath = normalizedPath?.split('src')[1];
			const segments = projectPath?.split('\\');
			return segments?.[1]
		}

		const getImportLayer = (value) => {
			const importPath = alias ? value.replace(`${alias}/`, '') : value;
			const segments = importPath?.split('/');
			return segments?.[0];
		}

		return {
			ImportDeclaration(node) {
				const importPath = node.source.value
				const currentFileLayer = getCurrentLayer()
				const importLayer = getImportLayer(importPath)

				if(isPathRelative(importPath)) {
					return;
				}

				if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
					return;
				}

				const isIgnored = ignoreImportPatterns.some(pattern => {
					return micromatch.isMatch(importPath, pattern)
				});

				if(isIgnored) {
					return;
				}

				if(!layers[currentFileLayer]?.includes(importLayer)) {
					context.report(node, 'Слой может импортировать в себя только нижележащие слои (исключение - "shared" и "entities")');
				}
			}
		};
	},
};
