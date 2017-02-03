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

module.exports = {
  computeAppropriateColumn(items, context, wrongColumnHandler) {
    var source = context.getSourceCode();
    var result = items.reduce(function (prev, cur) {
      var curCol = cur.loc.start.column;
      if (Math.abs(source.getTokenBefore(cur).loc.end.column - curCol) > 1) {
        return prev;
      }
      return Math.max(prev, curCol);
    }, null);

    if (null === result) {
      wrongColumnHandler();
      return;
    }

    return result;
  },
  computeActualColumn(items, source) {
    return items.reduce(function (prev, cur) {
      var col = source.getTokenBefore(cur).loc.end.column + 1;
      return Math.max(prev, col);
    }, 0);
  }
};
