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

const columnComputation = require('./columnComputation');
const fixer = require('./fixer');

module.exports = (items, context, node, source, alignOnLongestVar) => {
  if (items.length <= (alignOnLongestVar | 0)) {
    return;
  }

  let longestColumn;
  if (alignOnLongestVar) {
    longestColumn = columnComputation.computeAppropriateColumn(items, source);

    if (!longestColumn) {
      items.forEach(token => context.report({
        message: 'The punctuator column must be placed directly after the longest variable!',
        node:    token,
        fix:     f => fixer.removeAlignmentRange(source, token, f, columnComputation.computeActualColumn(items, source))
      }));

      return;
    }
  }

  const actual = columnComputation.computeActualColumn(items, source);

  items.forEach(punctuator => {
    const cur = punctuator.loc.start.column;
    const expected = columnComputation.computePreviousColumn(source, punctuator);
    if (isInvalidAlignment(cur, actual, alignOnLongestVar, alignOnLongestVar ? longestColumn : expected)) {
      context.report({
        message: 'Invalid indent!',
        node:    punctuator,
        fix:     fixer.createVarAlignmentFix(alignOnLongestVar ? actual : expected, cur, punctuator, source, alignOnLongestVar)
      });
    }
  });
};

const isInvalidAlignment = (cur, actual, alignOnLongestVar, comparableColumn) => alignOnLongestVar
  ? comparableColumn !== cur ^ (comparableColumn === cur && actual !== comparableColumn)
  : cur !== comparableColumn;
