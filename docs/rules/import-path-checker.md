# Checks if modules imported according to FSD rules (`fsd-architecture-checker/import-path-checker`)

<!-- end auto-generated rule header -->


## Rule Details

This rule aims to make all the import paths inside one module relative

```
    src/
        ...
        entities/
            EntitieName
                ui/
                    EntitieName.tsx  <-- use for imports INSIDE module!
                model/
                    types.ts  <-- use for imports INSIDE module!
                    ...
                index.ts  <-- use for imports OUTSIDE this module!
        features/
            ...     

```

Examples of **incorrect** code for this rule:

```js

	// filename to import in: 'C:\\project-name\\src\\features\\FeatureName\\ui\\FileName.tsx' 
    import { useSomeHook, otherFunction } from 'features/FeatureName/api/fetchingFunction';
    // import from same module should be relative

```

Examples of **correct** code for this rule:

```js

// filename to import in: 'C:\\project-name\\src\\features\\FeatureName\\ui\\FileName.tsx' 
import { useSomeHook, otherFunction } from '../api/fetchingFunction';
// import from same module is relative

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
