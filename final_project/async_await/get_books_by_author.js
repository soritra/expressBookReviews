const getBooksByAuthor = require("../router/general.js").getBooksByAuthor;
const [prog, path, ...params] = process.argv;

getBooksByAuthor(params[0]).then(data => {
  console.log(data);
});

