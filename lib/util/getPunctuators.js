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
var isPunctuatorAssignment = require('./isPunctuatorAssignment');

function isMultipleLineDeclaration(node, token) {
  return node.loc.start.line < token.loc.start.line;
}

function gatherPunctuatorsFromCurrentDeclaration(node, source) {
  return node.declarations.reduce(function (tokens, subToken, index) {
    // skip first one and empty declarations
    if (subToken.init && index > 0) {
      var punctuator = source.getTokensBetween(subToken.id, subToken.init)[0];
      if (isPunctuatorAssignment(punctuator) && isMultipleLineDeclaration(node, punctuator)) {
        tokens.push(punctuator);
      }
    }
    return tokens;
  }, []);
}


module.exports = function (node, source) {
  var punctuators = [];
  if (isVariableAssignment(node) && node.declarations.length > 1) {
    punctuators = gatherPunctuatorsFromCurrentDeclaration(node, source);
  }

  return punctuators;
};
