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
var jumpAssignmentExpressions = require('./jumpAssignmentExpressions');

module.exports = function(node, source, lines) {
  function isPunctuatorAssignment(token) {
    return token.type === 'Punctuator' && token.value === '=';
  }

  function getPunctuators(node, source) {
    function isMultipleLineDeclaration(node, token) {
      return node.loc.start.line < token.loc.start.line;
    }

    function gatherPunctuatorsFromCurrentDeclaration(node, source) {
      return node.declarations.reduce(function (tokens, subToken, index) {
        // skip first one and empty declarations
        if (subToken.init && index > 0) {
          var punctuator = source.getTokensBetween(subToken.id, subToken.init).shift();
          if (isPunctuatorAssignment(punctuator) && isMultipleLineDeclaration(node, punctuator)) {
            tokens.push(punctuator);
          }
        }
        return tokens;
      }, []);
    }

    var punctuators = [];
    if (isVariableAssignment(node) && node.declarations.length > 1) {
      punctuators = gatherPunctuatorsFromCurrentDeclaration(node, source);
    }

    return punctuators;
  }

  function getNextExpression(source, node) {
    function findNextExpressionToken(source, node) {
      var isVarAssignment = isVariableAssignment(node), amount = !isVarAssignment ? 2 : 1;
      return source.getTokenAfter(!isVarAssignment ? node.parent : node, amount);
    }

    var next = findNextExpressionToken(source, node);
    if (typeof next === 'undefined') {
      if (isVariableAssignment(node) && node.declarations.length > 1) {
        return [];
      }
      throw 'Failed to receive next expression!';
    }
    return jumpAssignmentExpressions(next, source);
  }

  function getDeclarations(node, source, lines) {
    try {
      var nextLine = lines[node.loc.end.line], punctuators = getPunctuators(node, source), punctuator;
      if (typeof nextLine !== 'undefined' && nextLine.trim().length !== 0) {
        punctuator = getNextExpression(source, node);
      }
    } finally {
      return punctuator ? punctuators.concat([punctuator]) : punctuators;
    }
  }

  return getDeclarations(node, source, lines);
};
