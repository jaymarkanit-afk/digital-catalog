// This file handles the book search functionality
// and rendering the search results on the main page.

import { renderBooks, searchBook } from "./booksHtml.js";
import { moreBookInformation } from "./seeMore.js";
import { booksData } from "./booksData.js";

// This script depends on functions from booksHtml.js and seeMore.js
const searchBar = document.querySelector(".js-searchbar");
const searchButton = document.querySelector(".js-search-button");
const noBooksDiv = document.querySelector(".js-no-books");

// Event listener for search button click
searchButton.addEventListener("click", (event) => {
  const searchResults = searchBook(searchBar.value);

  if (searchResults.length === 0) {
    noBooksDiv.classList.add("active");
  } else {
    noBooksDiv.classList.remove("active");
  }
  renderBooks(searchResults);
  moreBookInformation();

  searchBar.value = "";
});

// Event listener for Enter key press in search bar
searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchResults = searchBook(event.target.value.toLowerCase());

    if (searchResults.length === 0) {
      noBooksDiv.classList.add("active");
    } else {
      noBooksDiv.classList.remove("active");
    }
    renderBooks(searchResults);
    moreBookInformation();
    event.target.value = "";
  }
});

// Initial page load - render all books and set up event listeners
renderBooks(booksData);
moreBookInformation();
