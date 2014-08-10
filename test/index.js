'use strict';

var test = require('prova');
var sword = require('../index');

test('Books only', function (t) {
  t.same(sword('gen'), stub({ book: 1 }), 'single book');
  t.same(sword('GeN'), stub({ book: 1 }), 'single book (case insensitive)');
  t.same(sword('gen-exo'), stub({ book: 1 }, { book: 2 }), 'book range');
  t.same(sword('1 jn'), stub({ book: 62 }), 'book with number (space)');
  t.same(sword('1jn'), stub({ book: 62 }), 'book with number');
  t.same(sword('first john'), stub({ book: 62 }), 'book with number word (first, space)');
  t.same(sword('1st john'), stub({ book: 62 }), 'book with number (1st, space)');
  t.same(sword('i john'), stub({ book: 62 }), 'book with number (1st, space)');
  t.end();
});

test('Chapters', function (t) {
  t.same(stub({ book: 1, chapter: 1 }), sword('gen 1'));
  t.end();
});

test('Verses', function (t) {
  var start = { book: 1, chapter: 5, verse: 4 };

  t.same(sword('gen 5:4'), stub(start), 'Chapter and verse');
  t.same(sword('gen 5:4-8'), stub(start, { verse: 8 }), 'Chapter and verse range (start only)');
  t.same(sword('gen 5:4-6:8'), stub(start, { chapter: 6, verse: 8 }), 'Chapter and verse range (both)');
  t.same(sword('gen 5:4-exo 6:8'), stub(start, { book: 2, chapter: 6, verse: 8 }), 'Chapter and verse range (two books)');
  t.end();
});

test('Book Name', function (t) {
  t.equals(sword(1), 'Genesis', 'Id returns valid book');
  t.equals(sword(1, 'ru'), 'Бытие', 'Id with language key returns valid book');
  t.end();
});

test('Multiple passages', function (t) {
  t.same(sword('gen, 1jn'), stub({ book: 1 }).concat(stub({ book: 62 })), 'books only');
  t.same(sword('gen 15,16'), stub({ book: 1, chapter: 15 }).concat(stub({ chapter: 16 })), 'Single book, multiple chapters');
  t.end();
});

test('Languages', function (t) {
  t.same(sword.languages, [['English', 'en'], ['Russian', 'ru']], 'returns available languages');
  t.end();
});

function stub(start, end) {
  var result = [{ start: start }];

  if (end) {
    result[0].end = end;
  }

  return result;
}
