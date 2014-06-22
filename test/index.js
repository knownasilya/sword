'use strict';

var test = require('tape');
var sword = require('../index');

test('Books only', function (t) {
  t.same([1], sword('gen'), 'single book');
  t.same([1, 2], sword('gen-exo'), 'book range');
  t.same([1], sword('gen-gen'), 'single book - range (twice)');
  t.end();
});
