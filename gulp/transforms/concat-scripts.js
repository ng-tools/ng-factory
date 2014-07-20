'use strict';

var path = require('path');
var concat = require('gulp-concat-util');
var combine = require('stream-combiner');

module.exports = function(name) {

  function processSource(src) {
    return '// Source: ' + path.basename(this.path) + '\n' + (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
  }

  return combine(
    concat(name, {process: processSource}),
    concat.header('(function(window, document, undefined) {\n\'use strict\';\n'),
    concat.footer('\n})(window, document);\n')
  );

}
