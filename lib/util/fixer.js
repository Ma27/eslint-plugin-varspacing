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

function repeat(val, times) {
  var buffer = '';
  for (var i = 0; i < times; i++) {
    buffer += val;
  }

  return buffer;
}

function removeAlignmentRange(source, punctuator, fixer, column) {
  var before = source.getTokenBefore(punctuator);
  return fixer.removeRange([
    before.range[1] + (column - before.loc.end.column),
    punctuator.range[0]
  ]);
}

module.exports = {
  getWrongAlignmentFixer: function (column, cur, punctuator, source) {
    return function(fixer) {
      if (column > cur) {
        return fixer.insertTextBefore(punctuator, repeat(' ', column - cur));
      }
      return removeAlignmentRange(source, punctuator, fixer, column);
    };
  },
  getWrongColumnHandler: function(items, source, context) {
    return function () {
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
