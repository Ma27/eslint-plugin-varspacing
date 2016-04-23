/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian.bosch.27@gmail.com>
 * (c) Ben Bieler <benjaminbieler2014@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var validatePunctuators = require('../util/validatePunctuators');
var findNextPunctuators = require('../util/findNextPunctuators');

module.exports = function (context) {
  var source = context.getSourceCode();

  function declarationCheck(node) {
    if (-1 === ['Program', 'BlockStatement'].indexOf(node.parent.type)) {
      return;
    }
    validatePunctuators(
      findNextPunctuators(node, source),
      context,
      node,
      source
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
      source
    );
  }

  return {
    'VariableDeclaration':  declarationCheck,
    'AssignmentExpression': expressionCheck
  };
};

module.exports.schema = [];
