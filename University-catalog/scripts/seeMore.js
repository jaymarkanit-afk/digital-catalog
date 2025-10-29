/* This file handles the "See More" functionality for books.
 It adds event listeners to the "See More" buttons and displays */

// additional information about the selected book in a sidebar.
// It depends on booksData.js to retrieve book details.
// It is used by bookSearches.js to ensure the functionality works after searches.
// It also depends on booksHtml.js to render the books initially.

import { booksData } from "./booksData.js";
import { addToCart } from "../borrow-scripts/borrow-cart.js";

export function moreBookInformation() {
  const seeMoreInfo = document.querySelectorAll(".js-book-more-info");
  const moreInfoDiv = document.querySelector(".more-info-sidebar");
  const removeDiv = document.querySelector(".remove-div");
  const bookInfoContainer = document.querySelector(".js-book-information");

  if (removeDiv) {
    removeDiv.addEventListener("click", () => {
      moreInfoDiv.classList.remove("active");
    });
  }

  seeMoreInfo.forEach((button) => {
    button.addEventListener("click", () => {
      moreInfoDiv.classList.add("active");

      const clickedIsbn = button.dataset.bookIsbn;
      const findBook = booksData.find((item) => item.isbn === clickedIsbn);

      if (findBook) {
        const {
          isbn: bookIsbn,
          Image: bookImage,
          bookName,
          bookAuthor,
          Location: bookLocation,
          Shelves: bookShelves,
          Description: bookDescription,
        } = findBook;

        const rightSideBarHtml = `
          <img src="${bookImage}" alt="${bookName}" />
          <p class="book-Name js-book-Name">${bookName}</p>
          <p class="book-Author js-book-Author">${bookAuthor}</p>
          <p class="description">${bookDescription}</p>
          <p class="location">Located: ${bookLocation} | Shelves: ${bookShelves}</p>
          <div class="location-info">
          <img src="icons/exclamation.png">
          <p class="location">Classification: Circulation</p>
          <p class="location">Genre: Programming</p>
          </div>
          <button class="borrow-button" data-isbn="${bookIsbn}">Borrow book</button>
        `;

        bookInfoContainer.innerHTML = rightSideBarHtml;
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("borrow-button")) {
      const bookIsbn = e.target.dataset.isbn;
      addToCart(bookIsbn);

      // Provide user feedback
      const button = e.target;
      const originalText = button.textContent;
      button.textContent = "Added to My Borrowed!";
      button.style.backgroundColor = "#4CAF50"; // Green color
      button.style.color = "white";

      // Reset button after 2 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
        button.style.color = "";
      }, 2000);
    }
  });
}
