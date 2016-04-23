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

var columnComputation = require('./columnComputation');
var fixer = require('./fixer');

module.exports = function(items, context, node, source) {
  if (items.length <= 1) {
    return;
  }

  var column = columnComputation.computeAppropriateColumn(items, context, fixer.getWrongColumnHandler(items, source, context)),
      actual = columnComputation.computeActualColumn(items, source);
  if (typeof column !== 'undefined') {
    items.forEach(function (punctuator) {
      var cur = punctuator.loc.start.column;
      if (column !== cur ^ (column === cur && actual !== column)) {
        context.report({
          message: 'Invalid indent!',
          node:    punctuator,
          fix:     fixer.getWrongAlignmentFixer(actual, cur, punctuator, source)
        });
      }
    });
  }
};
