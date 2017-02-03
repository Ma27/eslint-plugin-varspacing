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

var _store = [];
function isDeclared(token) {
  return -1 !== _store.indexOf(token);
}

module.exports = {
  register(token) {
    if (!isDeclared(token)) {
      _store.push(token);
      return true;
    }
    return false;
  },
  validateDeclarations(node) {
    return !this.register(node) || isDeclared(node.parent) || isDeclared(node.parent.parent)
  }
};
