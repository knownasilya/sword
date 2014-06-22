'use strict';

var test = require('tape');
var sword = require('../index');

test('Books only', function (t) {
  t.same([1], sword('gen'), 'single book');
  t.same([1, 2], sword('gen-exo'), 'book range');
  t.same([64], sword('1 jn'), 'book with number (space)');
  t.same([64], sword('1jn'), 'book with number');
  t.end();
});

test('Chapters', function (t) {
  t.same([{ start: { book: 1, chapter: 1 } }], sword('gen 1'));
  t.end();
});

test('Multiple passages', function (t) {
  t.same([1, 64], sword('gen, 1jn'), 'books only');
  t.end();
});
