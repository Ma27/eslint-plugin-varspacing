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

module.exports = function (source, node) {
  try {
    var isObjectAssignment = !isVariableAssignment(node), amount = isObjectAssignment && node.computed ? 5 : 4;
    if (!isObjectAssignment && (node.declarations.length > 1) || isTernaryOperator(node)) {
      amount = 3;
    }
    return getPunctuators(node, source).concat([source.getTokenAfter(isObjectAssignment ? node.parent : node, amount)]);
  } catch (e) {
    // if an object assignment is in the last line (like a module.exports expression)
    // the token searcher may fail
    return [];
  }
};
