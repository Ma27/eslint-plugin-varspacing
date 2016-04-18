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

function computeAppropriateColumn(items, context, node) {
  var source = context.getSourceCode();
  var result = items.reduce(function (prev, cur) {
    var curCol = cur.loc.start.column;
    if (Math.abs(source.getTokenBefore(cur).loc.end.column - curCol) > 1) {
      return prev;
    }
    return curCol > prev ? curCol : prev;
  }, null);

  if (null === result) {
    context.report({
      message: 'The punctuator column must be directly after the longest variable!',
      node:    node
    });
    return;
  }

  return result;
}

module.exports = function(current, next, context, node) {
  if (next.length === 0) {
    return;
  }

  var items = next.concat([current]), column = computeAppropriateColumn(items, context, node);
  if (typeof column !== 'undefined') {
    items.forEach(function (punctuator) {
      if (column !== punctuator.loc.start.column) {
        context.report({
          message: 'Invalid indent!',
          node:    punctuator
        });
      }
    });
  }
};
