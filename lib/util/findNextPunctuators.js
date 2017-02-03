/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian@mbosch.me>
 * (c) Ben Bieler <ben@benbieler.com>
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
  return gatherAssignmentsFromNodes(parseStatements(node, getExpressionNode(node)), source);
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
      case 'ReturnStatement':
        if (stmt.argument && stmt.argument.type === 'AssignmentExpression') {
          list.push(source.getTokensBetween(stmt.argument.left, stmt.argument.right).shift());
        }
        return list;
      default:
        return list;
    }
  }, []);
}

function parseStatements(node, exprNode) {
  var tokens = findParentTokens(exprNode, node),
      index = tokens.indexOf(exprNode),
      statements = isWrappedBySwitchCaseBlock(node)
        ? node.parent.parent.consequent
        : tokens.slice(0).splice(index, tokens.length - index);

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
  return -1 !== ['VariableDeclaration', 'AssignmentExpression', 'ExpressionStatement', 'ReturnStatement', 'ExportNamedDeclaration'].indexOf(stmt.type)
    && (typeof previous === 'undefined' || (start - previous.loc.end.line) === 1);
}

function getExpressionNode(node) {
  if ('AssignmentExpression' === node.type) {
    return node.parent.type === 'SequenceExpression' || isWrappedBySwitchCaseBlock(node) ? node.parent.parent : node.parent;
  }
  return node;
}

function findParentTokens(exprNode, node) {
  if (isWrappedBySwitchCaseBlock(node)) {
    return node.parent.parent.consequent;
  }
  return exprNode.parent.body;
}

function isWrappedBySwitchCaseBlock(node) {
  return node.parent && node.parent.parent && node.parent.parent.type === 'SwitchCase';
}
