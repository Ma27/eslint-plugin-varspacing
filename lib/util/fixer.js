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
  createVarAlignmentFix(column, cur, punctuator, source, alignOnLongestVar) {
    return fixer => {
      if (alignOnLongestVar && column > cur) {
        return fixer.insertTextBefore(punctuator, ' '.repeat(column - cur))
      }

      return this.removeAlignmentRange(source, punctuator, fixer, column);
    };
  },
  removeAlignmentRange(source, punctuator, fixer, column) {
    var before = source.getTokenBefore(punctuator);
    return fixer.removeRange([
      before.range[1] + (column - before.loc.end.column),
      punctuator.range[0]
    ]);
  }
};
