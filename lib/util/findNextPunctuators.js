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

var registerToken = require('./registerToken');

module.exports = function(node, source) {
  if (registerToken.validateDeclarations(node)) {
    return [];
  }

  var exprNode = getExpressionNode(node),
      blockStmt = exprNode.parent,
      tokens = blockStmt.body,
      index = tokens.indexOf(exprNode),
      statements = parseStatements(tokens.slice(0).splice(index, tokens.length - index));

  return gatherAssignmentsFromNodes(statements, source);
};

function gatherAssignmentsFromNodes(statements, source) {
  return statements.reduce(function (list, stmt) {
    registerToken.register(stmt);
    switch (stmt.type) {
      case 'ExpressionStatement':
      case 'AssignmentExpression':
        var expr = stmt.type === 'ExpressionStatement' ? stmt.expression : stmt,
            expressions = expr.type === 'SequenceExpression' ? expr.expressions : [expr];

        return list.concat(expressions.reduce(function (list, token, i) {
          var prev = expressions[i - 1];
          if (token.right && (typeof prev === 'undefined' || token.loc.start.line - prev.loc.end.line === 1)) {
            list.push(source.getTokensBetween(token.left, token.right).shift());
          }
          return list;
        }, []));
      case 'VariableDeclaration':
        var punctuators = [];
        stmt.declarations.forEach(function (declaration) {
          if (checkDeclaration(declaration, punctuators)) {
            punctuators.push(source.getTokensBetween(declaration.id, declaration.init).shift());
          }
        });

        return list.concat(punctuators);
      default:
        return list;
    }
  }, []);
}

function parseStatements(statements) {
  return statements.reduce(function (list, stmt) {
    var previous = list[list.length - 1], start = stmt.loc.start.line;
    if (checkToken(stmt, previous, start)) {
      list.push(stmt);
    }
    return list;
  }, []);
}

function checkDeclaration(declaration, punctuators) {
  return declaration.init
    && (punctuators.length === 0 || punctuators[punctuators.length - 1].loc.start.line !== declaration.loc.start.line);
}


function checkToken(stmt, previous, start) {
  return -1 !== ['VariableDeclaration', 'AssignmentExpression', 'ExpressionStatement'].indexOf(stmt.type)
    && (typeof previous === 'undefined' || (start - previous.loc.end.line) === 1);
}

function getExpressionNode(node) {
  if ('AssignmentExpression' === node.type) {
    return node.parent.type === 'SequenceExpression' ? node.parent.parent : node.parent;
  }
  return node;
}
