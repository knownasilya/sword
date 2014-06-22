sword
=====

Simple Bible passage parser. Converts text based passages into a usable object.

> For the word of God is living and active, sharper than any two-edged sword,
piercing to the division of soul and of spirit, of joints and of marrow,
and discerning the thoughts and intentions of the heart.

_Hebrews 4:12 (ESV)_

## Getting Started

Use npm to install as a dependency:

```bash
npm install --save sword
```

The API is simple: 

```js
var sword = require('sword');
var results = sword('1jn 1:2-5');
// Use results for something good..

// Another use includes getting the name of the book:
var id = results[0].start.book;
var book = sword(id);
// book => '1 John'

var bookInRussian = sword(id, 'ru');
// bookInRussian => '1-e Иоанна'

var availableLanguages = sword.languages;
// availableLanguages => [['English', 'en'], ['Russian', 'ru'], ..]
```

Results are in the following form:

```json
[{
  start: {
    book: 64, chapter: 1, verse: 2
  },
  end: {
    verse: 5
  }
}]
```

Every item in the array is a distinct passage, i.e. comma seperated passages.
From there every passage is represented by an object, which stays simple by
only returning none redundent data.
