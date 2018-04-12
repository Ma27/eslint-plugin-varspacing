eslint-plugin-varspacing
========================

[![Code Climate](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing/badges/gpa.svg)](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing)
[![Issue Count](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing/badges/issue_count.svg)](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing)
[![Build Status](https://travis-ci.org/Ma27/eslint-plugin-varspacing.svg?branch=master)](https://travis-ci.org/Ma27/eslint-plugin-varspacing)
[![npm version](https://badge.fury.io/js/eslint-plugin-varspacing.svg)](https://www.npmjs.com/package/eslint-plugin-varspacing)
[![Coverage Status](https://coveralls.io/repos/github/Ma27/eslint-plugin-varspacing/badge.svg?branch=master)](https://coveralls.io/github/Ma27/eslint-plugin-varspacing?branch=master)

This plugin aims to implement a eslint rule like ``object-spacing``, but for variables.

## Installation

Install [ESLint](https://github.com/eslint/eslint) and this plugin into
your project:

``` code
npm i --save-dev eslint eslint eslint-plugin-varspacing
npx eslint
```

## Configuration

This plugin must be added to the ``plugins`` section in the ``.eslintrc``:

``` json
{
  "plugins": [
    "varspacing"
  ],
  "extends": "plugin:varspacing/recommended"
}
```

### Available rules

- [var-spacing](https://github.com/Sententiaregum/eslint-plugin-varspacing/blob/master/docs/rules/var-spacing.md)

## Use with `nix` as package manager

It's possible to use this module with the `nix` package manager based on `node2nix`.
A shell with a `node` instance and all loaded `npm` dependencies can be opened using the following command:

``` shell
nix-shell
```

Furthermore it's possible to actually build the package:

```
nix build -f . -A package
```

To regenerate the locked package build run the following command:

```
node2nix . --supplement-input mocha.json -6 --composition nix/default.nix --node-env nix/node-env.nix --output nix/node-packages.nix --input package.json --supplement-output supplement.nix
```

## License

This module is published under MIT license. Please refer to the [`LICENSE`](https://github.com/Sententiaregum/eslint-plugin-varspacing/blob/master/LICENSE) file in the package root.
