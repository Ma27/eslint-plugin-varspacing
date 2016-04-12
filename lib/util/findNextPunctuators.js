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

var collectVariableDeclarations = require('./collectVariableDeclarations');
var getNextObjectAssignment = require('./getNextObjectAssignment');
var isNextLineNotEmpty = require('./isNextLineNotEmpty');
var isVariableAssignment = require('./isVariableAssignment');

function findNextExpressionToken(source, node) {
  return source.getTokenAfter(!isVariableAssignment(node) ? node.parent : node, !isVariableAssignment(node) ? 2 : 1);
}

function isNextObjectExpression(source, node) {
  try {
    var next = findNextExpressionToken(source, node);

    if (typeof next === 'undefined') {
      if (isVariableAssignment(node) && node.declarations.length > 1) {
        return false;
      }
      return null;
    }
    return -1 !== ['.', '['].indexOf(next.value);
  } catch (e) {
    return false;
  }
}

module.exports = function(node, source, lines) {
  if (isNextLineNotEmpty(lines[node.loc.start.line])) {
    var isObjectExpr = isNextObjectExpression(source, node);
    if (null === isObjectExpr) {
      return [];
    }

    return isObjectExpr
      ? getNextObjectAssignment(source, node)
      : collectVariableDeclarations(node.computed ? node.parent : node, source);
  }
  return [];
};
