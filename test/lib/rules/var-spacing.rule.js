/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian.bosch.27@gmail.com>
 * (c) Ben Bieler <benjaminbieler2014@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var rule   = require('../../../lib/rules/var-spacing.rule');
var tester = require('eslint').RuleTester;

var ruleTester = new tester();
ruleTester.run('var-spacing', rule, {
  valid: [{
    code: [
      'this.foo    = [];',
      'this.bar    = [];',
      'this.foobar = {};'
    ].join('\n')
  }, {
    code: [
      'foo      += 1;',
      'var blah = [];'
    ].join('\n')
  }, {
    code: [
      'var foo    = {};',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {},',
      '    bar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {},',
      '    bar = [1,2,3],',
      '    baz = {};'
    ].join('\n')
  }, {
    code: [
      'let foo   = [1,2,3];',
      'const bar = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const foo = [1,2,3];',
      'let bar   = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'var foo = {};',
      '',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {};',
      'for (var i = 0; i < 10; i++) {',
      '}'
    ].join('\n')
  }, {
    code: [
      'var foo = {};',
      'foo     = [];'
    ].join('\n')
  }, {
    code: [
      'var foo    = {},',
      '    foobar = [];',
      'var baz    = {};'
    ].join('\n')
  }, {
    code: [
      'var foo;',
      'let blah = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'var foo = {};',
      'let blah;'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'var foo    = function () {',
      '    console.log(arguments);',
      '};',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo    = {};',
      'var bar;',
      'var foobar = [];'
    ].join('\n')
  }, {
    code: [
      'let foo, bar;',
      'const foobar = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'let foo, bar = {};',
      'let items    = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const foo = {}, bar = {};',
      'let items = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'let foobar = {}, bar;',
      'let items  = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const foo = {}, bar = {};',
      'let items = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const foo = bar = {};',
      'let blah  = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'var foo  = bar = {},',
      '    blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo    =', // helpful in case of multiline expressions as some assignments would reach the 120 char limit
      '    {};',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo  = {},',
      '    bar1 = [];',
      'var lol  = [];'
    ].join('\n')
  }, {
    code: [
      'function foo () {',
      '  this.blah = {};',
      '  this.foo  = [];',
      '}'
    ].join('\n')
  }, {
    code: [
      'var obj = {};',
      '',
      'obj["foo"]  = {};',
      'obj["blah"] = [];'
    ].join('\n')
  }, {
    code: [
      'var obj    = {};',
      'obj["lol"] = [];'
    ].join('\n')
  }, {
    code: [
      'obj["lol"] = { foo: null };',
      'var obj    = [];'
    ].join('\n')
  }, {
    code: [
      'var obj    = {},',
      '    number = 5;',
      'obj.foo    = [];'
    ].join('\n')
  }, {
    code: [
      'var obj1    = {}, number = 5;',
      'obj1.foobar = [];'
    ].join('\n')
  }, {
    code: [
      'var foo  = true ? {} : [];',
      'var blah = [];'
    ].join('\n')
  },{
    code: [
      'obj.expr = true ? {} : [];',
      'var foo  = [];'
    ].join('\n')
  }, {
    code: [
      'var foo  = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n')
  }, {
    code: [
      'var foo  = bar = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n')
  }, {
    code: [
      'obj.expr = bar = true ? {} : [];',
      'var bar  = [];'
    ].join('\n')
  }, {
    code: [
      'obj.expr = {};',
      'for (var i = 0; i < 10; i++) {',
      '}'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? {} : [];',
      'for (var i = 0; i < 10; i++) {',
      '}'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? {} : [0, 1];',
      'debugger;'
    ].join('\n')
  }, {
    code: [
      'obj["foo"] = {};',
      'debugger;'
    ].join('\n')
  }, {
    code: [
      'var foo = {};',
      'debugger;'
    ].join('\n')
  }, {
    code: [
      'var foo  = {},',
      '    bar  = [];',
      'var blah = true ? [] : {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {}, blah = [];',
      'foo     = true ? [] : {}'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? [] : {}, blah = [];',
      'foo     = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo, blah = true ? [] : {}',
      'foo           = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo = [], blah = true ? [] : {};',
      'foo     = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo   = [];',
      'var blah;',
      'var bar22 = {};'
    ].join('\n')
  }, {
    code: [
      'var foo   = [],',
      '    bar;',
      'var bar22 = {};'
    ].join('\n')
  }, {
    code: [
      'var foo    = [];',
      'var blah,',
      '    foobar = {};'
    ].join('\n')
  }, {
    code: [
      'obj.expr   = [];',
      'var foo;',
      'var blah22 = {};'
    ].join('\n')
  }, {
    code: [
      'obj.expr   = [],',
      '    foo;',
      'var blah22 = {};'
    ].join('\n')
  }, {
    code: [
      'obj.expr   = [];',
      'var foo,',
      '    blah22 = {};'
    ].join('\n')
  }, {
    code: [
      'obj.expr = {}, foo;',
      'var blah = [];'
    ].join('\n')
  }, {
    code: [
      'var foo  = true ? [] : false ? {} : [[]];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo  = bar = baz = true ? [] : {};',
      'var blah = true;'
    ].join('\n')
  }, {
    code: [
      'var foo  = bar = baz = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n')
  }, {
    code: [
      'var foo, bar = baz = true ? {} : [];',
      'obj.expr     = [];'
    ].join('\n')
  }, {
    code: [
      'obj.expr     = [];',
      'var foo, bar = baz = true ? {} : [];'
    ].join('\n')
  }, {
    code: [
      'var foo  = [];',
      'obj.blah = {};'
    ].join('\n')
  }, {
    code: [
      'obj.foo  = obj.blah = {};',
      'var blah = [];'
    ].join('\n')
  }, {
    code: [
      'obj.foo    = obj.blah = true ? [] : {};',
      'foo["bar"] = true;'
    ].join('\n')
  }, {
    code: [
      'var foo    = (false === foo.blah) ? [] : {};',
      'obj.assign = function () {};'
    ].join('\n')
  }, {
    code: [
      'obj.expr           = [];',
      'var foo, bar, blah = {};'
    ].join('\n')
  }, {
    code: [
      'obj["expr"]  = [];',
      'var foo, bar = {};'
    ].join('\n')
  }, {
    code: [
      'obj["expr"] = [];',
      'var foobarb = {},',
      '    blah    = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = bar = baz = true;',
      'var lol = [];'
    ].join('\n')
  }, {
    code: [
      'obj.foo = [];',
      'var foo, bar;'
    ].join('\n')
  }, {
    code: [
      'obj.foo  = [];',
      'var foo, bar,',
      '    blah = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'const blah         = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const {',
      '  foo,',
      '  bar,',
      '  blah,',
      '  baz',
      '} = obj;',
      '',
      'const { lol, muhh } = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = obj;',
      'var foo, bar       = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar }  = obj;',
      'const { muh, blah } = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = obj;',
      'let { foo, bar }   = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar, baz } = obj;',
      'const foo               = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = obj;',
      'const foo          = true ? [] : {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = true ? blah : foo;',
      'const foo          = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = obj.expr;',
      'const foo          = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = obj["expr"];',
      'const foo          = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      'const { foo, bar } = true ? obj.expr : obj["expr"];',
      'const foo          = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    }
  }, {
    code: [
      '_store = {};',
      '_ids   = [];'
    ].join('\n')
  }, {
    code: [
      '_store = {},',
      '_ids   = [];'
    ].join('\n')
  }, {
    code: [
      '_store = {}, _ids = [];'
    ].join('\n')
  }, {
    code: [
      '_store   = [], _ids, _bar = [];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo, bar = [],',
      '    blah     = {};'
    ].join('\n')
  }, {
    code: [
      '_store = {},',
      '_ids   += 1;'
    ].join('\n')
  }, {
    code: [
      'var foo  = [];',
      'var bar;',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      '_foo   = [],',
      'bar,',
      'foobar = {};'
    ].join('\n')
  },  {
    code: [
      'this.foo  = {};',
      'var foo   = [],',
      '    blah  = {};',
      'this.blah = {};',
      'this.lol  = [];'
    ].join('\n')
  }, {
    code: [
      'if (true) {',
      '  for (var i = 0; i < 10; i++) {',
      '    this.foo = i;',
      '    blah     = i;',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'var foo = {};',
      'if (Object.keys(foo) > 0) {',
      '  var bar = [];',
      '  for (var i = 0; i < 10; i++) {',
      '    bar = i;',
      '    foo = bar;',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'for (var i = 0; i < 10; i++) { foo += i; blah = {}; }'
    ].join('\n')
  }, {
    code: [
      '_store = {}, _ids = [];'
    ].join('\n')
  }, {
    code: [
      '_store  = {}, _ids = [];',
      'var foo = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = {}; _store = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = {}, bar; _store = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = {}, bar = []; _store = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = {},',
      '    bar; _store = [];' // var assignment at same line with `_store` assignment
    ].join('\n')
  }, {
    // https://github.com/Sententiaregum/eslint-plugin-varspacing/issues/26
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test2 = 15;',
      '}'
    ].join('\n')
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test2   = 15;',
      '        test345 = 25;',
      '}'
    ].join('\n')
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6 = 10;',
      '        if (expr) {',
      '            test2   = 15;',
      '            test345 = 25;',
      '        }',
      '}'
    ].join('\n')
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6  = 10;',
      '        test78 = 23;',
      '        if (expr) {',
      '            test2   = 15;',
      '            test345 = 25;',
      '        }',
      '}'
    ].join('\n')
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6 = 10;',
      '    case "Goodbye":',
      '        test79 = 12;',
      '        test8  = 13;',
      '}'
    ].join('\n')
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6 = 10;',
      '    case "Goodbye":',
      '        test79 = 12;',
      '}'
    ].join('\n')
  }],
  invalid: [{
    code: [
      'var foo  = {};',
      'var foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo    = {};',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {},',
      '    bazbaz = []'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo    = {},',
      '    bazbaz = []'
    ].join('\n')
  }, {
    code: [
      'var foo = {};',
      'foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo = {};',
      'foo     = [];'
    ].join('\n')
  }, {
    code: [
      'var foo    = {},',
      '    foobar = [];',
      'var baz   = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo    = {},',
      '    foobar = [];',
      'var baz    = {};'
    ].join('\n')
  }, {
    code: [
      'const foo = {};',
      'let bar  = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    parserOptions: {
      ecmaVersion: 6
    },
    output: [
      'const foo = {};',
      'let bar   = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = function () {',
      '    console.log(arguments);',
      '};',
      'var foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo    = function () {',
      '    console.log(arguments);',
      '};',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = bar = {};',
      'var blah      = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = bar = {};',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = bar = {},',
      '    blah      = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = bar = {},',
      '    blah = [];'
    ].join('\n')
  }, {
    code: [
      'var foo =', // helpful in case of multiline expressions as some assignments would reach the 120 char limit
      '    {};',
      'var foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo    =',
      '    {};',
      'var foobar = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {},',
      '    bar1 = [];',
      'var lol = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = {},',
      '    bar1 = [];',
      'var lol  = [];'
    ].join('\n')
  }, {
    code: [
      'function foo() {',
      '  this.blah = {};',
      '  this.foo = [];',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'function foo() {',
      '  this.blah = {};',
      '  this.foo  = [];',
      '}'
    ].join('\n')
  }, {
    code: [
      'var obj = {};',
      '',
      'obj["foo"] = {};',
      'obj["blah"] = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var obj = {};',
      '',
      'obj["foo"]  = {};',
      'obj["blah"] = [];'
    ].join('\n')
  }, {
    code: [
      'obj["foo"] = {};',
      'var foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj["foo"] = {};',
      'var foo    = [];'
    ].join('\n')
  }, {
    code: [
      'var obj = {};',
      'obj["lol"] = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var obj    = {};',
      'obj["lol"] = [];'
    ].join('\n')
  }, {
    code: [
      'var obj = {},',
      '    number = 5;',
      'obj.foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'var obj    = {},',
      '    number = 5;',
      'obj.foo    = [];'
    ].join('\n')
  }, {
    code: [
      'var obj1 = {}, number = 5;',
      'obj1.foobar = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var obj1    = {}, number = 5;',
      'obj1.foobar = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? {} : [];',
      'var blah = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = true ? {} : [];',
      'var blah = [];'
    ].join('\n')
  }, {
    code: [
      'obj.expr = true ? {} : [];',
      'var foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj.expr = true ? {} : [];',
      'var foo  = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = bar = true ? {} : [];',
      'obj.expr      = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = bar = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n')
  }, {
    code: [
      'obj.expr = bar = true ? {} : [];',
      'var bar        = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj.expr = bar = true ? {} : [];',
      'var bar  = [];'
    ].join('\n')
  }, {
    code: [
      'var foo = {},',
      '    bar = [];',
      'var blah = true ? [] : {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = {},',
      '    bar  = [];',
      'var blah = true ? [] : {};'
    ].join('\n')
  }, {
    code: [
      'var foo = {}, blah = [];',
      'foo                = true ? [] : {}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo = {}, blah = [];',
      'foo     = true ? [] : {}'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? [] : {}, blah = [];',
      'foo                            = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo = true ? [] : {}, blah = [];',
      'foo     = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? [] : {}, blah = [];',
      'foo        = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo = true ? [] : {}, blah = [];',
      'foo     = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo, blah = true ? [] : {}',
      'foo    = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo, blah = true ? [] : {}',
      'foo           = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo = [], blah = true ? [] : {};',
      'foo = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo = [], blah = true ? [] : {};',
      'foo     = blah;'
    ].join('\n')
  }, {
    code: [
      'var foo = true ? [] : false ? {} : [[]];',
      'var blah = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = true ? [] : false ? {} : [[]];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo = bar = baz = true ? [] : {};',
      'var blah = true;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = bar = baz = true ? [] : {};',
      'var blah = true;'
    ].join('\n')
  }, {
    code: [
      'var foo, bar = baz = true ? {} : [];',
      'obj.expr  = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo, bar = baz = true ? {} : [];',
      'obj.expr     = [];'
    ].join('\n')
  }, {
    code: [
      'var foo           = [];',
      'var blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = [];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo           = [],',
      '    blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = [],',
      '    blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo           = [];',
      'obj.blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = [];',
      'obj.blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo          = [];',
      'obj.blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = [];',
      'obj.blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo           = bar = [];',
      'obj.blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = bar = [];',
      'obj.blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo           = true ? {} : [];',
      'var blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = true ? {} : [];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo          = [];',
      'var blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'var foo  = [];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'obj.expr = [];',
      'var foo, bar = baz = true ? {} : [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj.expr     = [];',
      'var foo, bar = baz = true ? {} : [];'
    ].join('\n')
  }, {
    code: [
      'obj.expr = [];',
      'var foo, bar, blah = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj.expr           = [];',
      'var foo, bar, blah = {};'
    ].join('\n')
  }, {
    code: [
      'obj["expr"] = [];',
      'var foo, bar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj["expr"]  = [];',
      'var foo, bar = {};'
    ].join('\n')
  }, {
    code: [
      'obj["expr"] = [];',
      'var foobarb = {},',
      '    blah = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj["expr"] = [];',
      'var foobarb = {},',
      '    blah    = [];'
    ].join('\n')
  }, {
    code: [
      'obj.foo = [];',
      'var foo, bar,',
      '    blah = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'obj.foo  = [];',
      'var foo, bar,',
      '    blah = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'const foo = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj;',
      'const foo          = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'obj["foo"] = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj;',
      'obj["foo"]         = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'obj.expr = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj;',
      'obj.expr           = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'var foo, bar = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj;',
      'var foo, bar       = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'const { muh, blah } = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar }  = obj;',
      'const { muh, blah } = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'let { foo, bar } = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj;',
      'let { foo, bar }   = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar, baz } = obj;',
      'const foo = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar, baz } = obj;',
      'const foo               = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj;',
      'const foo = true ? [] : {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj;',
      'const foo          = true ? [] : {};'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = true ? blah : foo;',
      'const foo = [];'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = true ? blah : foo;',
      'const foo          = [];'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj.expr;',
      'const foo = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj.expr;',
      'const foo          = {};'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = obj["expr"];',
      'const foo = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = obj["expr"];',
      'const foo          = {};'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar } = true ? obj.expr : obj["expr"];',
      'const foo = {};'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'const { foo, bar } = true ? obj.expr : obj["expr"];',
      'const foo          = {};'
    ].join('\n')
  }, {
    code: [
      'const { foo, bar }    = blah;',
      'let { foo, blah }     = muh;'
    ].join('\n'),
    parserOptions: {
      ecmaVersion: 6
    },
    errors: [{
      message: 'The punctuator column must be placed directly after the longest variable!'
    }, {
      message: 'The punctuator column must be placed directly after the longest variable!'
    }],
    output: [
      'const { foo, bar } = blah;',
      'let { foo, blah }  = muh;'
    ].join('\n')
  }, {
    code: [
    'this.foo = [];',
    'this.bar = [];',
    'this.foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'this.foo    = [];',
      'this.bar    = [];',
      'this.foobar = {};'
    ].join('\n')
  }, {
    code: [
      'foo     += 1;',
      'var blah = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'foo      += 1;',
      'var blah = [];'
    ].join('\n')
  }, {
    code: [
      'foo += 1;',
      'var blah = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'foo      += 1;',
      'var blah = [];'
    ].join('\n')
  }, {
    code: [
      '_store = {};',
      '_ids = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      '_store = {};',
      '_ids   = [];'
    ].join('\n')
  }, {
    code: [
      '_store = {},',
      '_ids = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      '_store = {},',
      '_ids   = [];'
    ].join('\n')
  }, {
    code: [
      '_store = [], _ids, _bar = [];',
      'var blah = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      '_store   = [], _ids, _bar = [];',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      'var foo, bar = [],',
      '    blah = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo, bar = [],',
      '    blah     = {};'
    ].join('\n')
  }, {
    code: [
      '_store = {},',
      '_ids += 1;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      '_store = {},',
      '_ids   += 1;'
    ].join('\n')
  }, {
    code: [
      'var foo = [];',
      'var bar;',
      'var blah = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo  = [];',
      'var bar;',
      'var blah = {};'
    ].join('\n')
  }, {
    code: [
      '_foo = [],',
      'bar,',
      'foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      '_foo   = [],',
      'bar,',
      'foobar = {};'
    ].join('\n')
  }, {
    code: [
      'this.foo = {};',
      'var foo = [],',
      '    blah = {};',
      'this.blah = {};',
      'this.lol = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }],
    output: [
      'this.foo  = {};',
      'var foo   = [],',
      '    blah  = {};',
      'this.blah = {};',
      'this.lol  = [];'
    ].join('\n')
  }, {
    code: [
      'if (true) {',
      '  for (var i = 0; i < 10; i++) {',
      '    this.foo = i;',
      '    blah = i;',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'if (true) {',
      '  for (var i = 0; i < 10; i++) {',
      '    this.foo = i;',
      '    blah     = i;',
      '  }',
      '}'
    ].join('\n')
  },  {
    code: [
      'var foo = {};',
      'if (Object.keys(foo) > 0) {',
      '  var bar = [];',
      '  for (var i = 0; i < 10; i++) {',
      '    bar = i;',
      '    foobar = bar;',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }],
    output: [
      'var foo = {};',
      'if (Object.keys(foo) > 0) {',
      '  var bar = [];',
      '  for (var i = 0; i < 10; i++) {',
      '    bar    = i;',
      '    foobar = bar;',
      '  }',
      '}'
    ].join('\n')
  },
  // https://github.com/Sententiaregum/eslint-plugin-varspacing/issues/26
  {
    code: [
      'var foo = "apple";',
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test2 = 15;',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test2 = 15;',
      '        test345 = 25;',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6 = 10;',
      '        if (expr) {',
      '            test2 = 15;',
      '            test345 = 25;',
      '        }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6 = 10;',
      '        test78 = 23;',
      '        if (expr) {',
      '            test2 = 15;',
      '            test345 = 25;',
      '        }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }, {
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var test = "banana";',
      'switch (test) {',
      '    case "Hello":',
      '        test6 = 10;',
      '    case "Goodbye":',
      '        test79 = 12;',
      '        test8 = 13;',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }]
});
