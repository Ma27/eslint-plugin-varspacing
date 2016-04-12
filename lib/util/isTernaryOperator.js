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

var isVariableAssignment = require('./isVariableAssignment');

function checkOutEdges(declaration) {
  if (isTernary(declaration)) {
    return true;
  }

  var right = declaration.right;
  if (typeof right === 'undefined') {
    return false;
  }

  return checkOutEdges(right);
}

function isTernary(node) {
  return typeof node.alternate !== 'undefined' && typeof node.consequent !== 'undefined';
}

module.exports = function (node) {
  if (isVariableAssignment(node)) {
    return checkOutEdges(node.declarations[0].init);
  }
  return node.value === '?';
};
