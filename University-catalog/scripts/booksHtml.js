/*this file contains functions to render books and search through them
and it depends on booksData.js
and is used by bookSearches.js
*/

import { booksData } from "./booksData.js";

//this function searches through the booksData array for matches
//and returns an array of matching books
//it ignores case and special characters in the search
export function searchBook(searchBook) {
  const cleanInput = searchBook.toLowerCase().replace(/[^a-z0-9 ]/gi, "");

  return booksData.filter((book) => {
    const cleanName = book.bookName.toLowerCase().replace(/[^a-z0-9 ]/gi, "");
    const cleanAuthor = book.bookAuthor
      .toLowerCase()
      .replace(/[^a-z0-9 ]/gi, "");
    const cleanIsbn = (book.isbn || "")
      .toLowerCase()
      .replace(/[^a-z0-9\-]/gi, "");

    return (
      cleanName.includes(cleanInput) ||
      cleanAuthor.includes(cleanInput) ||
      cleanIsbn.startsWith(cleanInput)
    );
  });
}

//this function renders the books passed to it as an array of objects
//it creates the html for each book and inserts it into the main grid
//it also adds the data attribute to each "See More" button for later use
export function renderBooks(bookList) {
  let bookHtml = "";

  bookList.forEach((books) => {
    bookHtml += `
        <div class="grid-container js-grid-container">
        <div>
            <img
              class="book-image"
              src="${books.Image}"
            />
          </div>
          <div class="book-info">
            <img class="ratings" src="${books.ratings}" />
            <p class="book-name">${books.bookName}</p>
            <p class="book-author">${books.bookAuthor}</p>
            <button class="book-more-info js-book-more-info" 
             data-book-isbn="${books.isbn}">See More</button>
          </div>
        </div>`;
  });

  document.querySelector(".main-grid").innerHTML = bookHtml;
}

renderBooks(booksData);
