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

var columnComputation = require('./columnComputation');
var fixer = require('./fixer');

module.exports = function(items, context, node, source, alignOnLongestVar) {
  if (items.length <= (alignOnLongestVar | 0)) {
    return;
  }

  var longestColumn;
  if (alignOnLongestVar) {
    longestColumn = columnComputation.computeAppropriateColumn(
      items,
      source,
      fixer.getWrongColumnHandler(items, source, context)
    );
  }

  if (!alignOnLongestVar || typeof longestColumn !== 'undefined') {
    var actual = columnComputation.computeActualColumn(items, source);

    items.forEach(punctuator => {
      const cur = punctuator.loc.start.column;
      const expected = columnComputation.computePreviousColumn(source, punctuator);

      if (isInvalidAlignment(cur, actual, alignOnLongestVar, alignOnLongestVar ? longestColumn : expected)) {
        context.report({
          message: 'Invalid indent!',
          node:    punctuator,
          fix:     fixer.getWrongAlignmentFixer(alignOnLongestVar ? actual : expected, cur, punctuator, source, alignOnLongestVar)
        });
      }
    });
  }
};

function isInvalidAlignment(cur, actual, alignOnLongestVar, comparableColumn) {
  if (alignOnLongestVar) {
    return comparableColumn !== cur ^ (comparableColumn === cur && actual !== comparableColumn);
  }

  return cur !== comparableColumn;
}
