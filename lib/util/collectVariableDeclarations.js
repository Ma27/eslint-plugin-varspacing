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
var isPunctuatorAssignment = require('./isPunctuatorAssignment');

function isNewVariable(expression) {
  return expression.type === 'Keyword' && -1 !== ['var', 'let', 'const'].indexOf(expression.value);
}

module.exports = function (node, source) {
  var isAssignment = isVariableAssignment(node),
      after = source.getTokenAfter(node.declarations ? node : node.parent, isAssignment ? 0 : 1),
      punctuators = getPunctuators(node, source);

  // check the next line for further expressions and skip completely in case of empty lines
  if (typeof after !== 'undefined') {
    // checks whether a new variable is introduced
    // or an existing one will be changed.
    var punctuator = isNewVariable(after) ? source.getTokenAfter(after, 1) : source.getTokenAfter(after);

    if (isPunctuatorAssignment(punctuator)) {
      punctuators.push(punctuator);
    }
  }

  return punctuators;
};
