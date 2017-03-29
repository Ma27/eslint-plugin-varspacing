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
  /**
   * Computes the appropriate (longest) column that should exist in a set of var declarations.
   */
  computeAppropriateColumn(items, source) {
    return items.reduce(function (prev, cur) {
      const curCol = cur.loc.start.column;
      if (Math.abs(source.getTokenBefore(cur).loc.end.column - curCol) > 1) {
        return prev;
      }
      return Math.max(prev, curCol);
    }, false);
  },

  /**
   * Computes the previous column to compare it with the current column.
   */
  computePreviousColumn(source, item) {
    return source.getTokenBefore(item).loc.end.column + 1;
  },

  /**
   * Computes the actual (expected) column of a set of var declarations.
   */
  computeActualColumn(items, source) {
    return items.reduce((prev, cur) => Math.max(prev, source.getTokenBefore(cur).loc.end.column + 1), 0);
  }
};
