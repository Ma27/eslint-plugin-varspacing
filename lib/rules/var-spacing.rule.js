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

function validatePunctuators(current, next, context, node) {
  next.forEach(function (nextPunctuator) {
    if (current.loc.start.column !== nextPunctuator.loc.start.column) {
      context.report({
        message: 'Invalid indent!',
        node:    node
      });
    }
  });
}

function isPunctuatorAssignment(token) {
  return token.type === 'Punctuator' && token.value === '=';
}

function isNextLineEmpty(nextLine) {
  return nextLine.trim().length !== 0;
}

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

function isNewVariable(expression) {
  return expression.type === 'Keyword' && -1 !== ['var', 'let', 'const'].indexOf(expression.value);
}

function findNextPunctuators(node, source, lines) {
  var after       = source.getTokenAfter(node),
      nextLine    = lines[node.loc.start.line];

  // in this case one big var assignment is declared:
  //
  // var var1 = {},
  //     foo  = [];
  // let blah = '';
  var punctuators = node.declarations.length > 1 ? gatherPunctuatorsFromCurrentDeclaration(node, source) : [];

  // check the next line for further expressions and skip completly in case of empty lines
  if (typeof after !== 'undefined' && typeof nextLine !== 'undefined' && isNextLineEmpty(nextLine)) {
    // checks whether a new variable is introduced
    // or an existing one will be changed.
    var next       = source.getTokenAfter(after),
        punctuator = isNewVariable(after) ? source.getTokenAfter(next) : next;

    if (isPunctuatorAssignment(punctuator)) {
      punctuators.push(punctuator);
    }
  }

  return punctuators;
}

module.exports = function (context) {
  return {
    'VariableDeclaration': function (node) {
      var source = context.getSourceCode();

      // skip if the variable is declared, but not assigned to a value
      if (typeof node.declarations[0].init !== 'undefined' && node.declarations[0].init !== null) {
        // parse through the next AST tokens in order
        // to gather the next relevant tokens being necessary
        // for the alignment validation.
        var punctuator      = source.getTokensBetween(node.declarations[0].id, node.declarations[0].init)[0],
            nextPunctuators = findNextPunctuators(node, source, context.getSourceLines());

        if (typeof nextPunctuators !== 'undefined') {
          validatePunctuators(punctuator, nextPunctuators, context, node);
        }
      }
    }
  };
};

module.exports.schema = [];
