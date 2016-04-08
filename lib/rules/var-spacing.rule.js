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

function findNextPunctuators(node, source, lines) {
  var after       = source.getTokenAfter(node),
      nextLine    = lines[node.loc.start.line],
      punctuators = [];

  // in this case one big var assignment is declared:
  //
  // var var1 = {},
  //     foo  = [];
  // let blah = '';
  if (node.declarations.length > 1) {
    var nodeStartLine = node.loc.start.line;
    punctuators = node.declarations.filter(function (subToken) {
      return subToken.init !== null;
    }).map(function (subToken) {
      return source.getTokensBetween(subToken.id, subToken.init)[0];
    }).filter(function (token, index) {
      return token.type === 'Punctuator' && token.value === '=' && index > 0 && nodeStartLine < token.loc.start.line;
    });
  }

  // check the next line for further expressions and skip completly in case of empty lines
  if (typeof after !== 'undefined' && typeof nextLine !== 'undefined' && nextLine.trim().length !== 0) {
    // checks whether a new variable is introduced
    // or an existing one will be changed.
    if (after.type === 'Keyword' && -1 !== ['var', 'let', 'const'].indexOf(after.value)) {
      var expectedPunctuator = source.getTokenAfter(source.getTokenAfter(after));
      if (expectedPunctuator.value === '=') {
        punctuators.push(expectedPunctuator);
      }
    } else {
      var identifier = after.type,
          punctuator = source.getTokenAfter(after);

      if (identifier === 'Identifier' && punctuator.type === 'Punctuator' && punctuator.value === '=') {
        punctuators.push(punctuator);
      }
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
