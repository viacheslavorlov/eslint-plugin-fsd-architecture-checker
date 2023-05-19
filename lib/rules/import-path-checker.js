'use strict';

const path = require('path');
const {isPathRelative} = require('../helpers');

module.exports = {
	meta: {
		type: null, // `problem`, `suggestion`, or `layout`
		docs: {
			description: 'checks if modules imported according to FSD rules',
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
		return {
			ImportDeclaration(node) {
				// example: 'app/entities/Article'
				const value = node.source.value;
				const importTo = alias ? value.replace(`${alias}/`, '') : value;
				// full path to file C:/Users/src/pages/ArticlePage
				const fromFilename = context.getFilename();
				if (shouldBeRelative(fromFilename, importTo)) {
					context.report(node, 'В рамках одного модуля импорты должны быть относительны!')
				}
			}
		};
	},
};


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

//
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'entities/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'entities/ASdasd/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'features/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article', 'features/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'app/index.tsx'))
// console.log(shouldBeRelative('C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article', 'entities/Article/asfasf/asfasf'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '../../model/selectors/getSidebarItems'))
