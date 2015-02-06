'use strict';

var _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = function(config) {

  var template = ['/**',
    ' * {{ pkg.name }}',
    ' * @version v{{ pkg.version }} - {{ today }}',
    ' * @link {{ pkg.homepage }}',
    ' * @author {{ pkg.author.name }} <{{ pkg.author.email }}> ({{ pkg.author.url }})',
    ' * @license MIT License, http://www.opensource.org/licenses/MIT',
    ' */'].join('\n');

  var today = new Date().toISOString().substr(0, 10);

  return _.template(template)({pkg: config.pkg, today: today});

};
