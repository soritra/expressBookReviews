const getBooksByTitle = require("../router/general.js").getBooksByTitle;
const [prog, path, ...params] = process.argv;

getBooksByTitle(params[0]).then(data => {
  console.log(data);
});

