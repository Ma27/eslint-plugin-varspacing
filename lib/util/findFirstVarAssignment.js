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

function searchAssignmentList(node, step, defaultValue) {
  step = step || 0;
  if (typeof node.declarations[step] === 'undefined') {
    return defaultValue;
  }
  if (node.declarations.length > 1) {
    if (node.declarations[step].init === null) {
      return searchAssignmentList(node, step + 1, defaultValue);
    }
    return node.declarations[step];
  }
  return defaultValue;
}

module.exports = function (node) {
  return searchAssignmentList(node, 0, node.declarations[0]);
};
