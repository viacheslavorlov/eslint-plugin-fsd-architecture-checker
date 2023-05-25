# Restrict imports from higher layers to lower layers (`layers-imports-order`)

## Rule Details

This rule aims to force make imports only from lower layers.

### Order of imports:
shared* => entities* => features => widgets => pages => app

(*) - can be imported in same layer

```
    src/
        ...
        entities/
            EntitieName
                ui/
                    EntitieName.tsx  <-- used for imports inside module!
                model/
                index.ts  <-- used for imports outside this module!
        features/
            ...     

```

Examples of **incorrect** code for this rule:


```js

//filename: 'C:\\advanced-frontend\\src\\entities\\ArticleRating\\ui\\ArticleRating.tsx',
import { ArticleRating } from '@/features/Article'
//  in this example import made from higher layer

```

Examples of **correct** code for this rule:

```js

//filename: 'C:\\advanced-frontend\\src\\features\\ArticleRating\\ui\\ArticleRating.tsx',	
import { useGetArticleRating, useRateArticle } from 'entities/Article'
//  in this example import made from lower level layer


```

### Options

If you use some alias in your project include it in options
#### With alias

```js
//  .eslintrc.js
module.exports = {
	// ... other eslint settings ...
	rules: {
		// ... other rules ...
		'fsd-architecture-checker/layers-imports-orde': [
			'error', 
            {
				alias: '@', //optional
                ignoreImportPatterns: ['**/StoreProvider'] //optional
			}
        ]
	}
}
    
```

#### Without alias

```js
//  .eslintrc.js
module.exports = {
	// ... other eslint settings ...
	rules: {
		// ... other rules ...
		'fsd-architecture-checker/layers-imports-order': 'error'
	}
}
    
```

## When Not To Use It

If you don't use Feature-sliced Design on project - this plugin is not advised.

## Further Reading

Feature-Sliced Design
Architectural methodology for frontend projects
https://feature-sliced.design/
