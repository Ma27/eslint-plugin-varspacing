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

var _store = [];
function isDeclared(token) {
  return -1 !== _store.indexOf(token);
}

module.exports = {
  register: function (token) {
    if (!isDeclared(token)) {
      _store.push(token);
      return true;
    }
    return false;
  },
  validateDeclarations: function (node) {
    return !this.register(node) || isDeclared(node.parent) || isDeclared(node.parent.parent)
  }
};
