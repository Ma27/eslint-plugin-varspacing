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

function tryGetAppropriateExpression(source, next) {
  function getDeepExpression(next, x) {
    var after = source.getTokenAfter(next, 2 - x);
    if (after.value !== '=') {
      return getDeepExpression(after, 1);
    }
    return after;
  }
  function getES6CurlyExpression(next) {
    var after = source.getTokenAfter(next);
    if (after.value !== '}') {
      return getES6CurlyExpression(after);
    }
    return source.getTokenAfter(after);
  }
  function computeSteps(next) {
    return -1 !== ['.', '['].indexOf(next.value) ? (next.value === '[' ? 2 : 1) : (next.type === 'Identifier' ? 0 : -1);
  }

  var nextToken = source.getTokenAfter(next, computeSteps(next));
  switch(true) {
    case next.type === 'Identifier' && nextToken.value === ',':
      return getDeepExpression(next, 0);
    case next.value === '{':
      return getES6CurlyExpression(nextToken);
    default:
      return nextToken;
  }
}

module.exports = function (next, source) {
  var result = tryGetAppropriateExpression(source, next);
  return result.value === '=' ? result : null;
};
