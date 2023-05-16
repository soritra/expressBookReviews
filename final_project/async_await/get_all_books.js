let getAllBooks = require("../router/general.js").getAllBooks;

getAllBooks().then(data => {
  console.log(data);
});

