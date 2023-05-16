const getDetailsISBN = require("../router/general.js").getDetailsISBN;
const [prog, path, ...params] = process.argv;

getDetailsISBN(parseInt(params[0])).then(data => {
  console.log(data);
});

