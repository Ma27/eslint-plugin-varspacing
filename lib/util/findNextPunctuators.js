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

  function getNextExpressions(source, node) {
    function findNextExpressionToken(source, node) {
      var isVarAssignment = isVariableAssignment(node), amount = !isVarAssignment ? 2 : 1;
      return source.getTokenAfter(!isVarAssignment ? node.parent : node, amount);
    }
    function findProperPunctuator(next, x) {
      var after = source.getTokenAfter(next, 2 - x);
      if (after.value !== '=') {
        return findProperPunctuator(after, 1);
      }
      return after;
    }

    var result = [], punctuators = getPunctuators(node, source), next = findNextExpressionToken(source, node);
    if (typeof next === 'undefined') {
      if (isVariableAssignment(node) && node.declarations.length > 1) {
        return punctuators;
      }
      throw 'Failed to receive next expression!';
    }

    var steps = -1 !== ['.', '['].indexOf(next.value) ? (next.value === '[' ? 2 : 1) : (next.type === 'Identifier' ? 0 : -1),
        nextToken = source.getTokenAfter(next, steps);

    if (next.type === 'Identifier' && nextToken.value === ',') {
      nextToken = findProperPunctuator(next, 0);
    }

    if (nextToken.value === '=') {
      result.push(nextToken);
    }

    return result.concat(punctuators);
  }

  function getDeclarations(node, source, lines) {
    var nextLine = lines[node.loc.start.line];
    if (typeof nextLine !== 'undefined' && nextLine.trim().length !== 0) {
      try {
        return getNextExpressions(source, node);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  return getDeclarations(node, source, lines);
};
