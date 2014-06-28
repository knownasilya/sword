'use strict';

var chapterMap = require('./maps/en');
var chapterKeys = Object.keys(chapterMap);
var lastSection;
var currentSection = 0;

module.exports = function (passages, language) {
  if (language) {
    try {
      chapterMap = require('./maps/' + language);
    } catch(e) {}
  }

  if (typeof passages === 'number') {
    return bookName(passages, language);
  }
  else if (typeof passages === 'string') {
    return processPassages(passages, language);
  }
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
      if (options && options.shortCodes.indexOf(book) > -1) {
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

function bookName(id, language) {
  var valueMap = chapterMap;

  if (!id) {
    throw Error('Invalid id provided');
  }

  if (language && language !== 'en') {
    valueMap = require('./map/' + language);
  }
  
  var value = valueMap[id];

  return value ? value.name : undefined;
}

function processPassages(str, languageKey) {
  if (!str) {
    throw new Error('Invalid passage');
  }

  return str.split(',').reduce(function (passageList, item) {
    item = item.trim();

    var result = {};
    var sections = item.split('-');
    
    result = sections.reduce(function (passageObj, section) {
      if (!passageObj.start) {
        passageObj.start = processSection(section);
      }
      else {
        passageObj.end = processSection(section);
      }

      return passageObj;
    }, result);

    passageList.push(result);
    currentSection = 0;
    return passageList;
  }, []);
}

// Start/end sections
function processSection(section) {
  var result = {};
  var match = section.match(/(\d*\s*[a-z]+)+/i);
  var book = match && match.length ? match[0] : '';
  var noBook = book ? section.replace(book, '').replace(' ', '') : section;
  var chapterVerseSplit = noBook.split(':').filter(valid);

  currentSection++;

  if (book) {
    result.book = bookKey(book);
  }
  
  if (chapterVerseSplit.length) debugger;

  if (chapterVerseSplit[0]) {
    result[currentSection === 2 && isNum(lastSection.verse) && chapterVerseSplit.length === 1 ? 'verse' : 'chapter'] = Number(chapterVerseSplit[0]);
  }

  if (chapterVerseSplit[1] && !isNum(result.verse)) {
    result.verse = Number(chapterVerseSplit[1]);
  }

  lastSection = result;
  return result;
}

function bookKey(book,lang) {
  return chapterKeys.map(Number).find(function (key) {
    var chapterMeta = chapterMap[key];

    return chapterMeta.shortCodes.indexOf(book) > -1;
  });
}

Array.prototype.find = function (cb) {
  var length = this.length;
  var index = 0;
  var item;

  for (; index < length; index++) {
    item = this[index];
    if(cb(item)) {
      return item;
    }
  }
};

function valid(item) {
  return item !== undefined && item.length;
}

function isNum(prop) {
  return prop && typeof prop === 'number';
}
