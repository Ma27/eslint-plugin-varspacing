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

var getNextToken = require('./getNextToken');
var isVariableAssignment = require('./isVariableAssignment');
var getPunctuators = require('./getPunctuators');

module.exports = function (source, node) {
  try {
    var isObjectAssignment = !isVariableAssignment(node), amount = isObjectAssignment && node.computed ? 6 : 5;
    if (!isObjectAssignment && node.declarations.length > 1) {
      amount = 4;
    }
    return getPunctuators(node, source).concat([getNextToken(source, isObjectAssignment ? node.parent : node, amount)]);
  } catch (e) {
    // if an object assignment is in the last line (like a module.exports expression)
    // the token searcher may fail
    return [];
  }
};
