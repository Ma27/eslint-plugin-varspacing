eslint-plugin-varspacing
========================

[![Code Climate](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing/badges/gpa.svg)](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing)
[![Issue Count](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing/badges/issue_count.svg)](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing)
[![Build status](https://ci.appveyor.com/api/projects/status/elpdl78par306ai5?svg=true)](https://ci.appveyor.com/project/Ma27/eslint-plugin-varspacing)
[![Build Status](https://travis-ci.org/Sententiaregum/eslint-plugin-varspacing.svg?branch=master)](https://travis-ci.org/Sententiaregum/eslint-plugin-varspacing)
[![npm version](https://badge.fury.io/js/eslint-plugin-varspacing.svg)](https://www.npmjs.com/package/eslint-plugin-varspacing)

This plugin aims to implement a eslint rule like ``object-spacing``, but for variables.

## Installation

Install [ESLint](https://github.com/eslint/eslint) and this plugin globally:

``` code
npm install -g eslint eslint-plugin-varspacing
```

If you'd like to install ``ESLint`` locally, this plugin must be installed locally, too.

## Configuration

This plugin must be added to the ``plugins`` section in the ``.eslintrc``:

``` json
{
  "plugins": [
    "varspacing"
  ]
}
```

## Use rules

This plugin contains one rule only, the ``var-spacing`` rule:

``` json
{
  "extends": "plugin:varspacing/recommended"
}
```

### Available rules

- [var-spacing](https://github.com/Sententiaregum/eslint-plugin-varspacing/blob/master/docs/rules/var-spacing.md)

## Use with `nix` as package manager

It's possible to use this module with the `nix` package manager based on `node2nix`.
A shell with a `node` instance and all loaded `npm` dependencies can be opened using the following command:

``` shell
nix-shell -A shell
```

## License

This module is published under MIT license. Please refer to the [`LICENSE`](https://github.com/Sententiaregum/eslint-plugin-varspacing/blob/master/LICENSE) file in the package root.
