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
var isNextLineNotEmpty = require('./isNextLineNotEmpty');

function isPunctuatorAssignment(token) {
  return token.type === 'Punctuator' && token.value === '=';
}

function isMultipleLineDeclaration(node, token) {
  return node.loc.start.line < token.loc.start.line;
}

function isNewVariable(expression) {
  return expression.type === 'Keyword' && -1 !== ['var', 'let', 'const'].indexOf(expression.value);
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

module.exports = function (node, source, lines) {
  var after    = source.getTokenAfter(node),
    nextLine = lines[node.loc.start.line];

  // in this case one big var assignment is declared:
  //
  // var var1 = {},
  //     foo  = [];
  // let blah = '';
  var punctuators = node.declarations.length > 1 ? gatherPunctuatorsFromCurrentDeclaration(node, source) : [];

  // check the next line for further expressions and skip completly in case of empty lines
  if (typeof after !== 'undefined' && typeof nextLine !== 'undefined' && isNextLineNotEmpty(nextLine)) {
    // checks whether a new variable is introduced
    // or an existing one will be changed.
    var next       = source.getTokenAfter(after),
      punctuator = isNewVariable(after) ? source.getTokenAfter(next) : next;

    if (isPunctuatorAssignment(punctuator)) {
      punctuators.push(punctuator);
    }
  }

  return punctuators;
};
