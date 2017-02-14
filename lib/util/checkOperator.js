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

const allowedOperators = [
  '=',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '<<=',
  '>>=',
  '>>>=',
  '|=',
  '^=',
  '&='
];

const allowedFileNodes = [
  'Program',
  'BlockStatement'
];

const allowedExpressionNodes = allowedFileNodes.concat([
  'ExpressionStatement',
  'SequenceExpression'
]);

module.exports = (node, isExpression = true) => {
  if (isExpression) {
    return -1 === allowedOperators.indexOf(node.operator)
        || -1 === allowedExpressionNodes.indexOf(node.parent.type);
  }

  return -1 === allowedFileNodes.indexOf(node.parent.type);
};
