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

function removeAlignmentRange(source, punctuator, fixer, column) {
  var before = source.getTokenBefore(punctuator);
  return fixer.removeRange([
    before.range[1] + (column - before.loc.end.column),
    punctuator.range[0]
  ]);
}

module.exports = {
  getWrongAlignmentFixer(column, cur, punctuator, source) {
    return fixer => (column > cur)
      ? fixer.insertTextBefore(punctuator, ' '.repeat(column - cur))
      : removeAlignmentRange(source, punctuator, fixer, column);
  },
  getWrongColumnHandler: function(items, source, context) {
    return () => {
      var actual = columnComputation.computeActualColumn(items, source);
      items.forEach(function (token) {
        context.report({
          message: 'The punctuator column must be placed directly after the longest variable!',
          node:    token,
          fix:     function (fixer) {
            return removeAlignmentRange(context.getSourceCode(), token, fixer, actual);
          }
        });
      });
    }
  }
};
