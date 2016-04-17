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

module.exports = function (node) {
  var declarations = node.declarations, defaultValue = declarations[0];
  if (defaultValue.init) {
    return defaultValue;
  }

  return declarations.reduce(function (prev, cur) {
    if (prev && prev.init) {
      return prev;
    }
    if (cur.init) {
      return cur;
    }
    return prev;
  }, null);
};
