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
  }]
});
