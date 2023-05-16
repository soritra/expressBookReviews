const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
// check is the username is valid
  let found = users.filter(user => user.username === username);
  return found.length > 0;
}

const authenticatedUser = (username, password) => { // returns boolean
  // check if username and password match the one we have in records.
  let found = users.filter(user => user.username === username && user.password === password);
  return found.length > 0;
}

// only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      { data: password }, 
      'access', 
      { expiresIn: 60 * 3 }  // expires in 3mn
    );

    req.session.authorization = {
      accessToken, 
      username
    }    
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add or update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const idx = Object.keys(books).filter(k => k === isbn);
  const book = idx ? books[idx] : null;
  if (book) {
    const username = req.session.authorization.username;
    let msg = `Your review for the book with ISBN ${isbn} was added successfully!`;
    if (book.reviews.hasOwnProperty(username)) {
      msg = `Your review for the book with ISBN ${isbn} was updated successfully!`;
    }
    book.reviews[username] = req.body.review;
    res.send(msg)
  } else {
    res.send(`Book with isbn ${isbn} not found!`);
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const idx = Object.keys(books).filter(k => k === isbn);
  const book = idx ? books[idx] : null;
  if (book) {
    const username = req.session.authorization.username;
    if (book.reviews.hasOwnProperty(username)) {
      const msg = `Your review for the book with ISBN ${isbn} was deleted successfully!`;
      delete book.reviews[username];
      res.send(msg)
    } else {
      res.send(`You have not yet added any review for the book with isbn ${isbn}!`);
    }
  } else {
    res.send(`Book with isbn ${isbn} not found!`);
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

