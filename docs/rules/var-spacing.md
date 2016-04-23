var-spacing
===========

**Fixable:** This rule is automatically fixable using the `--fix` flag on the command line.

### Introduction

This rules validates the correct alignment of variable declarations:

__wrong:__

``` javascript
let foo = {},
    foobar = [];
```

__right:__

``` javascript
let foo    = {},
    foobar = [];
```

### Configuration

It doesn't need any configuration parameters as enabling means that the code must be checked for appropriate alignment.

### Rules

Some rules about that:

``` javascript
// blank lines can interrupt alignment rules:
var foo = {};

var foobar = [];

// multiple assignments can be done:
var foo  = [],
    bar  = {};
var blah = {};

// es6 style code:
const { foo, bar } = obj;
let blah           = [];
```
