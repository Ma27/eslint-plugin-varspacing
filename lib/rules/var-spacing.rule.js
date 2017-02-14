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

const validatePunctuators = require('../util/validatePunctuators');
const findNextPunctuators = require('../util/findNextPunctuators');
const checkOperator = require('../util/checkOperator');

module.exports = function (context) {
  var source = context.getSourceCode();
  const alignOnLongestVar = typeof context.options[0] === 'undefined' ? true : context.options[0];

  function declarationCheck(node) {
    if (checkOperator(node, false)) {
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
