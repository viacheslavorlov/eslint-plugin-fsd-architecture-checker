# Imports from other modules should be only from public api (`fsd-architecture-checker/public-api-import`)

<!-- end auto-generated rule header -->


## Rule Details

This rule aims to force use public api to make imports in other modules.
### AUTOFIX is added to plugin (for correct plugin work you need to enforce FSD architecture)

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

// filename to import in: 'C:\\project-name\\src\\features\\FeatureName\\ui\\FileName.tsx'

import { useSomeHook, anythingYouNeedToImport } from 'entities/EntitieName/api/fetchingFunction';
//  in this example import made from inside of the module - not from index file in root of module 'features/FeatureName'

```

Examples of **correct** code for this rule:

```js

// filename to import in: 'C:\\project-name\\src\\features\\FeatureName\\ui\\FileName.tsx'

import { useSomeHook, anythingYouNeedToImport } from 'entities/EntitieName';
//  in this example import made from index file in root of module 'features/FeatureName'


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
		'fsd-architecture-checker/import-path-checker': ['error', {alias: '@'}]
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
		'fsd-architecture-checker/import-path-checker': 'error'
	}
}
    
```

## When Not To Use It

If you don't use Feature-sliced Design on project - this plugin is not advised.

## Further Reading

Feature-Sliced Design
Architectural methodology for frontend projects
https://feature-sliced.design/