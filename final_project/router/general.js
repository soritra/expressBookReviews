const express = require('express');
const axios = require('axios');
const { BASE_URL, PORT } = require('../constants.js');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {  
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({ 
        "username": username,
        "password": password
      });
      return res.status(200).json({
        message: "User successfully registered. Now you can login"
      });
    } else {
      return res.status(404).json({
        message: "User already exists!"
      });    
    }
  } 
  return res.status(404).json({
    message: "Unable to register user."
  });
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const idx = Object.keys(books).filter(k => k === isbn);
  const book = idx ? books[idx] : {}; 
  res.send(book);
  // return res.status(300).json({message: "Yet to be implemented"});
 });

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const idx = Object.keys(books).filter(k => books[k].author.toLowerCase() === author);
  const book = idx ? books[idx] : {}; 
  res.send(book);
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const idx = Object.keys(books).filter(k => books[k].title.toLowerCase() === title);
  const book = idx ? books[idx] : {}; 
  res.send(book);
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const idx = Object.keys(books).filter(k => k === isbn);
  const book = idx ? books[idx].reviews : {}; 
  res.send(book);
  // return res.status(300).json({message: "Yet to be implemented"});
});

// base url
const baseUrl = "http://localhost:4400"; 

// async/await - get all books
const getAllBooks = async () => {
  try {
    const url = `${BASE_URL}:${PORT}/`;
    const items = await axios.get(url);
    return items.data;
  } catch(err) {
    // console.log(err.response.data);
    return { 
      "code": err.code, 
      "statusText": err.response.statusText 
    };
  }
}

// async/await - get book details based on ISBN
const getDetailsISBN = async (isbn) => {
  if (!isbn) {
    return {
      "code": 400,
      "statusText": "'ISBN' parameter missing!"
    }
  }
  
  try {
    const url = `${BASE_URL}:${PORT}/isbn/${isbn}`;
    const items = await axios.get(url);
    if (items.data) {
      return items.data;
    } else {
      return {
        "code": 204,
        "statusText": `Book with ISBN ${isbn} not found!`
      }
    }
  } catch(err) {
    return { 
      "code": err.code, 
      "statusText": err.response.statusText 
    };
  }
};

// async/await - get book details by author
const getBooksByAuthor = async (author) => {
  if (!author) {
    return {
      "code": 400,
      "statusText": "'author' parameter missing!"
    }
  }
  
  try {
    const url = `${BASE_URL}:${PORT}/author/${author}`;
    const items = await axios.get(url);
    if (items.data) {
      return items.data;
    } else {
      return {
        "code": 204,
        "statusText": `No book written by "${author}" found!`
      }
    }
  } catch(err) {
    return { 
      "code": err.code, 
      "statusText": err.response.statusText 
    };
  }
};

// async/await - get book details by title
const getBooksByTitle = async (title) => {
  if (!title) {
    return {
      "code": 400,
      "statusText": "'title' parameter missing!"
    }
  }
  
  try {
    const url = `${BASE_URL}:${PORT}/title/${title}`;
    const items = await axios.get(url);
    if (items.data) {
      return items.data;
    } else {
      return {
        "code": 204,
        "statusText": `No book titled "${title}" found!`
      }
    }
  } catch(err) {
    return { 
      "code": err.code, 
      "statusText": err.response.statusText 
    };
  }
};

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getDetailsISBN = getDetailsISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;

