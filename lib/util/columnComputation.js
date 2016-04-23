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

function bigger(a, b) {
  return a > b ? a : b;
}

module.exports = {
  computeAppropriateColumn: function (items, context, wrongColumnHandler) {
    var source = context.getSourceCode();
    var result = items.reduce(function (prev, cur) {
      var curCol = cur.loc.start.column;
      if (Math.abs(source.getTokenBefore(cur).loc.end.column - curCol) > 1) {
        return prev;
      }
      return bigger(prev, curCol);
    }, null);

    if (null === result) {
      wrongColumnHandler();
      return;
    }

    return result;
  },
  computeActualColumn: function (items, source) {
    return items.reduce(function (prev, cur) {
      var col = source.getTokenBefore(cur).loc.end.column + 1;
      return bigger(prev, col);
    }, 0);
  }
};
