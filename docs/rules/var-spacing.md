var-spacing
===========

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

It doesn't need any configuration parameters as enabling means that the code must be checked for appropriate alignment.

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
