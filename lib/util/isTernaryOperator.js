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

function isTernary(node) {
  return typeof node.alternate !== 'undefined' && typeof node.consequent !== 'undefined';
}

module.exports = function (node) {
  if (isVariableAssignment(node)) {
    var first = node.declarations[0].init;
    return isTernary(first) || first.right && isTernary(first.right);
  }
  return false;
};
