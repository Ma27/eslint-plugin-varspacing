/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian@mbosch.me>
 * (c) Ben Bieler <ben@benbieler.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var validatePunctuators = require('../util/validatePunctuators');
var findNextPunctuators = require('../util/findNextPunctuators');

module.exports = function (context) {
  var source = context.getSourceCode();
  const alignOnLongestVar = typeof context.options[0] === 'undefined' ? true : context.options[0];

  function declarationCheck(node) {
    if (-1 === ['Program', 'BlockStatement'].indexOf(node.parent.type)) {
      return;
    }
    validatePunctuators(
      findNextPunctuators(node, source),
      context,
      node,
      source,
      alignOnLongestVar
    );
  }

  function expressionCheck(node) {
    function checkOperator(node) {
      var allowedOperators = ['=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '|=', '^=', '&='];
      return -1 === allowedOperators.indexOf(node.operator)
        || -1 === ['Program', 'BlockStatement', 'ExpressionStatement', 'SequenceExpression'].indexOf(node.parent.type);
    }

    // only check for member expressions with an equal sign.
    // expressions like these `foo: bar` are handled by `key-spacing` and don't need to be validated.
    if (checkOperator(node)) {
      return;
    }
    validatePunctuators(
      findNextPunctuators(node, source),
      context,
      node,
      source,
      alignOnLongestVar
    );
  }

  return {
    'VariableDeclaration':  declarationCheck,
    'AssignmentExpression': expressionCheck
  };
};

module.exports.schema = [
  {
    "enum": [true, false]
  }
];
