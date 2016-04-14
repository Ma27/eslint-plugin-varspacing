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

module.exports = function(current, next, context, node) {
  next.forEach(function (nextPunctuator) {
    if (current.loc.start.column !== nextPunctuator.loc.start.column) {
      context.report({
        message: 'Invalid indent!',
        node:    node
      });
    }
  });
};
