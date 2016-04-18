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
var isTernaryOperator = require('./isTernaryOperator');

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

  function collectVariableDeclarations(node, source) {
    function isNewVariable(expression) {
      return expression.type === 'Keyword' && -1 !== ['var', 'let', 'const'].indexOf(expression.value);
    }

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
  }

  function getNextObjectAssignment(source, node) {
    function getTokenSearchAmount(node, isObjectAssignment, source) {
      if (isObjectAssignment && node.computed || isObjectAssignment && source.getTokenAfter(node.parent, 4).value === ']') {
        return 5;
      }

      var next = source.getTokenAfter(isObjectAssignment ? node.parent : node, 3);
      return !isObjectAssignment && (node.declarations.length > 1) || isTernaryOperator(node) || next.value === '=' ? 3 : 4;
    }

    try {
      var isObjectAssignment = !isVariableAssignment(node);
      return getPunctuators(node, source).concat([
        source.getTokenAfter(
          isObjectAssignment ? node.parent : node,
          getTokenSearchAmount(node, isObjectAssignment, source)
        )
      ]);
    } catch (e) {
      // if an object assignment is in the last line (like a module.exports expression)
      // the token searcher may fail
      return [];
    }
  }

  function isNextObjectExpression(source, node) {
    function findNextExpressionToken(source, node) {
      var isVarAssignment = isVariableAssignment(node), amount = !isVarAssignment ? 2 : 1;
      return source.getTokenAfter(!isVarAssignment ? node.parent : node, amount);
    }

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

  var nextLine = lines[node.loc.start.line];
  if (typeof nextLine !== 'undefined' && nextLine.trim().length !== 0) {
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
