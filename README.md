eslint-plugin-varspacing
========================

[![Code Climate](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing/badges/gpa.svg)](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing)
[![Issue Count](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing/badges/issue_count.svg)](https://codeclimate.com/github/Sententiaregum/eslint-plugin-varspacing)
[![Build status](https://ci.appveyor.com/api/projects/status/elpdl78par306ai5?svg=true)](https://ci.appveyor.com/project/Ma27/eslint-plugin-varspacing)
[![Build Status](https://travis-ci.org/Sententiaregum/eslint-plugin-varspacing.svg?branch=master)](https://travis-ci.org/Sententiaregum/eslint-plugin-varspacing)

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

## License

The MIT License (MIT)

Copyright (c) 2016 The Sententiaregum Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
