'use strict';

var chapterMap = {
  1: ['gen', 'ge', 'g', 'genesis'],
  2: ['exo']
};
var chapterKeys = Object.keys(chapterMap);

module.exports = function (passage) {
  var length = chapterKeys.length;
  var index = 0;
  var key;
  var books = passage.match(/((\d)*(\ )*[A-Za-z])+(\ )*/g)
    .map(trimMe);


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
