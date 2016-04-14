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
var getPunctuators = require('./getPunctuators');
var isTernaryOperator = require('./isTernaryOperator');

function getTokenSearchAmount(node, isObjectAssignment) {
  return (isObjectAssignment && node.computed)
    ? 5
    : (!isObjectAssignment && (node.declarations.length > 1) || isTernaryOperator(node)) ? 3 : 4;
}

module.exports = function (source, node) {
  try {
    var isObjectAssignment = !isVariableAssignment(node);
    return getPunctuators(node, source).concat([
      source.getTokenAfter(isObjectAssignment ? node.parent : node, getTokenSearchAmount(node, isObjectAssignment))
    ]);
  } catch (e) {
    // if an object assignment is in the last line (like a module.exports expression)
    // the token searcher may fail
    return [];
  }
};
