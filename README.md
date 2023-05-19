# eslint-plugin-fsd-import-checker

checks import paths according to FSD architecture

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-import-checker`:

```sh
npm install eslint-plugin-fsd-import-checker --save-dev
```

## Usage

Add `fsd-import-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-import-checker"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-import-checker/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                     | Description                                               |
| :------------------------------------------------------- | :-------------------------------------------------------- |
| [import-path-checker](docs/rules/import-path-checker.md) | checks if modules imported according to FSD rules         |
| [public-api-import](docs/rules/public-api-import.md)     | imports from other modules should be only from public api |

<!-- end auto-generated rules list -->


