'use strict';

var chapterMap = require('./maps/en');
var chapterKeys = Object.keys(chapterMap);

module.exports = function (passage, language) {
  if (language) {
    try {
      chapterMap = require('./maps/' + language);
    } catch(e) {}
  }

  var length = chapterKeys.length;
  var index = 0;
  var key;
  var books = passage.match(/((\d)*(\ )*[A-Za-z])+(\ )*/g)
    .map(trimMe);
  var noBooks = removeBooks(passage, books);
  var verses = noBooks.match(/(\d)+(:)*(\d)*/g).map(trimMe);
  console.log(noBooks, verses);
  for (; index < length; index++) {
    key = chapterKeys[index];

    if (chapterMap[key].indexOf(passage) > -1) {
      break;
    }
  } 

  return bookNumber(books);
};

function trimMe(item) {
  return item && typeof item === 'string'
    ? item.trim() : item;
}

function bookNumber(books) {
  var key;
  var length = chapterKeys.length;
  var index = 0;
  var bookIds = books.map(function (book) {
    for (; index < length; index++) {
      key = chapterKeys[index];
      var options = chapterMap[key];
      if (options.indexOf(book) > -1) {
        return Number(key);
      }
    }
  });

  return bookIds;
}

function removeBooks(str, books) {
  if (!books) {
    return str;
  }

  var result = str;
  
  books.forEach(function (book) {
    result = result.replace(book, '');
  });

  // remove spaces - its safe now
  result = result.replace(' ', '');

  return result;
}
