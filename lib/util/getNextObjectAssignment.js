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

var getNextToken = require('./getNextToken');
var isNextLineNotEmpty = require('./isNextLineNotEmpty');

module.exports = function (source, node, lines) {
  try {
    if (isNextLineNotEmpty(lines[node.loc.start.line])) {
      var next = getNextToken(source, node.parent, node.computed ? 6 : 5);
      return [next];
    }
  } catch (e) {
    // if an object assignment is in the last line (like a module.exports expression)
    // the token searcher may fail
    return [];
  }
};
