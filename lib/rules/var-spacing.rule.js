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
var findFirstVarAssignment = require('../util/findFirstVarAssignment');

module.exports = function (context) {
  var source = context.getSourceCode(), sourceLines = context.getSourceLines();

  function declarationCheck(node) {
    // skip if the variable is declared, but not assigned to a value
    var first = findFirstVarAssignment(node);
    if (first.init !== null) {
      // parse through the next AST tokens in order
      // to gather the next relevant tokens being necessary
      // for the alignment validation.
      validatePunctuators(
        source.getTokensBetween(first.id, first.init).shift(),
        findNextPunctuators(node, source, sourceLines),
        context,
        node
      );
    }
  }

  function expressionCheck(node) {
    // only check for member expressions with an equal sign.
    // expressions like these `foo: bar` are handled by `key-spacing` and don't need to be validated.
    if (node.parent.operator !== '=') {
      return;
    }
    validatePunctuators(
      source.getTokensBetween(node.parent.left, node.parent.right).shift(),
      findNextPunctuators(node, source, sourceLines, node),
      context,
      node
    );
  }

  return {
    'VariableDeclaration': declarationCheck,
    'MemberExpression':    expressionCheck
  };
};

module.exports.schema = [];
