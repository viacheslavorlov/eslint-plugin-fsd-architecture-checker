'use strict';

const path = require('path');

module.exports = {
	meta: {
		type: null, // `problem`, `suggestion`, or `layout`
		docs: {
			description: 'checks if modules imported according to FSD rules',
			recommended: false,
			url: null, // URL to the documentation page for this rule
		},
		fixable: null, // Or `code` or `whitespace`
		schema: [], // Add a schema if the rule has options
	},
	create(context) {
		return {
			ImportDeclaration(node) {
				// example: 'app/entities/Article'
				const importTo = node.source.value;
				// full path to file C:/Users/src/pages/ArticlePage
				const fromFilename = context.getFilename();
				if (shouldBeRelative(fromFilename, importTo)) {
					context.report(node, 'ru: В рамках одного модуля импорты должны быть относительны! \n' +
						'en: Imports inside same module should be relative!')
				}
			}
		};
	},
};

function isPathRelative(path) {
	return path === '.' || path.startsWith('./') || path.startsWith('../')
}

const layers = {
	'entities': 'entities',
	'features': 'features',
	'shared': 'shared',
	'pages': 'pages',
	'widgets': 'widgets',
}

function shouldBeRelative(from, to) {
	if(isPathRelative(to)) {
		return false;
	}
	const toArray = to.split(/\/|\\\\/)
	const toLayer = toArray[0];
	const toSlice = toArray[1];
	if(!toLayer || !toSlice || !layers[toLayer]) {
		return false;
	}
	const normalizedPath = path.toNamespacedPath(from);
	const projectFrom = normalizedPath.split('src')[1];
	const fromArray = projectFrom.split('\\')
	const fromLayer = fromArray[1];
	const fromSlice = fromArray[2];

	if(!fromLayer || !fromSlice || !layers[fromLayer]) {
		return false;
	}

	return fromSlice === toSlice && toLayer === fromLayer;
}


console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'entities/Article/fasfasfas'))
console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'entities/ASdasd/fasfasfas'))
console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'features/Article/fasfasfas'))
console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article', 'features/Article/fasfasfas'))
console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'app/index.tsx'))
console.log(shouldBeRelative('C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article', 'entities/Article/asfasf/asfasf'))
console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '../../model/selectors/getSidebarItems'))
