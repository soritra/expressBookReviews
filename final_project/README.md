## Final Project for the course "Developing Back-End Apps with Node.js and Express" 
## (IBM Fullstack Developer Pro Certificate via Coursera)

### Notes

The tasks 10 to 13 can be tested using terminal (Linux or Mac) like below.
Please make sure to be in the same level as the file 'package.json' i.e inside the `final_project` directory.

#### Retrieve the list of books (task 10)
```
node async_await/get_all_books.js
```

It will display a result like (truncated for brevity):
```
{
  '1': { author: 'Chinua Achebe', title: 'Things Fall Apart', reviews: {} },
  '2': {
    author: 'Hans Christian Andersen',
    title: 'Fairy tales',
    reviews: {}
  },
  ...
  '10': {
    author: 'Samuel Beckett',
    title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
    reviews: {}
  }
}
```

#### Retrieve the book details based on ISBN (task 11)
Here the argument `2` is the ISBN.
```
node async_await/get_details_isbn.js 2
```

The command above will output:
```
{
  author: 'Hans Christian Andersen',
  title: 'Fairy tales',
  reviews: {}
}
```

If the ISBN parameter is not specified in the command above, it will display something like:
```
{ code: 400, statusText: "'ISBN' parameter missing!" }
```

#### Retrieve the book details base on author (task 12)
Here the argument `"Hans Christian Andersen"` is the author.
Please make sure to include the name of the author between double quotes or "".
The search by author is case insensitive here.
```
node async_await/get_books_by_author.js "Hans Christian Andersen"
```

It will display a result similar to:
```
{
  author: 'Hans Christian Andersen',
  title: 'Fairy tales',
  reviews: {}
}
```

#### Retrieve the book details based on title (task 13)
Please make sure to include the title of the book between double quotes or "".
The search by book title is case insensitive here.
```
node async_await/get_books_by_title.js "Pride and Prejudice"
```

Its output will be similar to:
```
{ author: 'Jane Austen', title: 'Pride and Prejudice', reviews: {} }
```
