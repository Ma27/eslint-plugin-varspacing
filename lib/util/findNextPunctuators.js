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

var collectVariableDeclarations = require('./collectVariableDeclarations');
var getNextObjectAssignment = require('./getNextObjectAssignment');

module.exports = function(node, source, lines) {
  return node.declarations
    ? collectVariableDeclarations(node, source, lines)
    : getNextObjectAssignment(source, node, lines);
};
