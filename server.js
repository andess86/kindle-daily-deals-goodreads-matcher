var request = require('request-promise');
var xml2js = require('xml2js');
require('dotenv').config();

let options = {
  method: 'GET',
  uri: `https://www.goodreads.com/review/list/${process.env.USER_ID}.xml`,
  qs: {
    key: process.env.KEY,
    v: process.env.VERSION,
    shelf: process.env.SHELF,
    per_page: process.env.PER_PAGE,
  },
};

request(options)
  .then((shelf) => {
    xml2js.parseString(shelf, function (err, result) {
      let books = result['GoodreadsResponse']['reviews'][0]['review'];
      books.map((book, i) => {
        console.log('ISBN: ', book.book[0].isbn);
        console.log('Title: ', book.book[0].title);
        console.log('Author: ', book.book[0].authors[0].author[0].name);
        console.log('Description: ', book.book[0].description);
      });
    });
  })
  .catch((err) => console.error(err));
