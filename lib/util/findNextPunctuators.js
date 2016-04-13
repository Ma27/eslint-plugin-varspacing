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
var isVariableAssignment = require('./isVariableAssignment');

function findNextExpressionToken(source, node) {
  return source.getTokenAfter(!isVariableAssignment(node) ? node.parent : node, !isVariableAssignment(node) ? 2 : 1);
}

function isNextObjectExpression(source, node) {
  try {
    var next = findNextExpressionToken(source, node);
  } catch (e) {
    return false;
  }

  if (typeof next === 'undefined') {
    if (isVariableAssignment(node) && node.declarations.length > 1) {
      return false;
    }
    throw 'Failed to receive next expression!';
  }
  return -1 !== ['.', '['].indexOf(next.value);
}

module.exports = function(node, source, lines) {
  var nextLine = lines[node.loc.start.line];
  if (typeof nextLine === 'undefined' ? false : nextLine.trim().length !== 0) {
    try {
      var isObjectExpr = isNextObjectExpression(source, node);
    } catch (e) {
      // if the search failed, nothing will be returned
      return [];
    }

    return isObjectExpr
      ? getNextObjectAssignment(source, node)
      : collectVariableDeclarations(node.computed ? node.parent : node, source);
  }
  return [];
};
