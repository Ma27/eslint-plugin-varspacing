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
      'var foo = {};',
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
      'var foo = [];',
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
      'obj.expr = [];',
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
  }],
  invalid: [{
    code: [
      'var foo  = {};',
      'var foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = {},',
      '    bazbaz = []'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = {};',
      'foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo    = {},',
      '    foobar = [];',
      'var baz   = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
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
    }
  }, {
    code: [
      'var foo = function () {',
      '    console.log(arguments);',
      '};',
      'var foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = bar = {};',
      'var blah      = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = bar = {},',
      '    blah      = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo =', // helpful in case of multiline expressions as some assignments would reach the 120 char limit
      '    {};',
      'var foobar = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
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
    }]
  }, {
    code: [
      'function foo() {',
      '  this.blah = {};',
      '  this.foo = [];',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var obj = {};',
      '',
      'obj["foo"] = {};',
      'obj["blah"] = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'obj["foo"] = {};',
      'var foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var obj = {};',
      'obj["lol"] = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
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
    }]
  }, {
    code: [
      'var obj1 = {}, number = 5;',
      'obj1.foobar = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = true ? {} : [];',
      'var blah = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'obj.expr = true ? {} : [];',
      'var foo = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = true ? {} : [];',
      'obj.expr = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = bar = true ? {} : [];',
      'obj.expr      = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'obj.expr = bar = true ? {} : [];',
      'var bar        = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
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
    }]
  }, {
    code: [
      'var foo = {}, blah = [];',
      'foo                = true ? [] : {}'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = true ? [] : {}, blah = [];',
      'foo                            = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = true ? [] : {}, blah = [];',
      'foo        = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo, blah = true ? [] : {}',
      'foo    = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = [], blah = true ? [] : {};',
      'foo = blah;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = true ? [] : false ? {} : [[]];',
      'var blah = {};'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo = bar = baz = true ? [] : {};',
      'var blah = true;'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo, bar = baz = true ? {} : [];',
      'obj.expr  = [];'
    ].join('\n'),
    errors: [{
      message: 'Invalid indent!'
    }]
  }, {
    code: [
      'var foo           = [];',
      'var blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }, {
    code: [
      'var foo           = [],',
      '    blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }, {
    code: [
      'var foo           = [];',
      'obj.blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }, {
    code: [
      'var foo          = [];',
      'obj.blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }, {
    code: [
      'var foo           = bar = [];',
      'obj.blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }, {
    code: [
      'var foo           = true ? {} : [];',
      'var blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }, {
    code: [
      'var foo          = [];',
      'var blah          = {};'
    ].join('\n'),
    errors: [{
      message: 'The punctuator column must be directly after the longest variable!'
    }]
  }]
});
