'use strict';

var test = require('tape');
var sword = require('../index');

test('Books only', function (t) {
  t.same(stub({ book: 1 }), sword('gen'), 'single book');
  t.same(stub({ book: 1 }, { book: 2 }), sword('gen-exo'), 'book range');
  t.same(stub({ book: 62 }), sword('1 jn'), 'book with number (space)');
  t.same(stub({ book: 62 }), sword('1jn'), 'book with number');
  t.end();
});

test('Chapters', function (t) {
  t.same(stub({ book: 1, chapter: 1 }), sword('gen 1'));
  t.end();
});

test('Verses', function (t) {
  t.same(stub({ book: 1, chapter: 5, verse: 4 }), sword('gen 5:4'), 'Chapter and verse');
  t.same(stub({ book: 1, chapter: 5, verse: 4 }, { verse: 8 }), sword('gen 5:4-8'), 'Chapter and verse range (start only)');
  t.same(stub({ book: 1, chapter: 5, verse: 4 }, { chapter: 6, verse: 8 }), sword('gen 5:4-6:8'), 'Chapter and verse range (both)');
  t.same(stub({ book: 1, chapter: 5, verse: 4 }, { book: 2, chapter: 6, verse: 8 }), sword('gen 5:4-exo 6:8'), 'Chapter and verse range (two books)');
  t.end();
});

test('Book Name', function (t) {
  t.equals('Genesis', sword(1));
  t.end();
});

test('Multiple passages', function (t) {
  t.same(stub({ book: 1 }).concat(stub({ book: 62 })), sword('gen, 1jn'), 'books only');
  t.same(stub({ book: 1, chapter: 15 }).concat(stub({ chapter: 16 })), sword('gen 15,16'), 'Single book, multiple chapters');
  t.end();
});

test('Languages', function (t) {
  t.same([['English', 'en']], sword.languages);
  t.end();
});

function stub(start, end) {
  var result = [{ start: start }];

  if (end) {
    result[0].end = end;
  }

  return result;
}
