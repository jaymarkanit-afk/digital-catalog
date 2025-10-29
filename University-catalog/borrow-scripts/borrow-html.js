// Import necessary functions and data from other modules
// This module handles rendering the borrowed books on the borrow page.
// It retrieves the cart data and book details to generate the HTML content.

import { getCart } from "./borrow-cart.js";
import { booksData } from "../scripts/booksData.js";

// Function to render borrowed books
function renderBorrowedBooks() {
  const cart = getCart();
  console.log("Rendering borrowed books, cart contents:", cart);

  const reviewGrids = document.querySelector(".review-grids");
  const cartCount = document.querySelector(".js-cart-count");

  if (reviewGrids) {
    reviewGrids.innerHTML = "";
  }

  // Update cart count
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = `(${totalItems} Items)`;
    console.log("Updated cart count to:", totalItems);
  }

  // Generate HTML for each book in cart
  cart.forEach((element) => {
    const bookIsbn = element.isbn;
    let matchingIsbn;

    booksData.forEach((book) => {
      if (book.isbn === bookIsbn) {
        matchingIsbn = book;
      }
    });

    if (matchingIsbn) {
      console.log("Generating HTML for book:", matchingIsbn.bookName);
      const htmlContent = `
        <div class="review-container">
          <div class="due-date">Due date: N/A - Waiting for approval</div>
          <div class="checkout-data">
            <div>
              <img
                class="image"
                src="${matchingIsbn.Image}"
                alt="${matchingIsbn.bookName}"
              />
            </div>
            <div class="review-item-details">
              <div class="name">${matchingIsbn.bookName}</div>
              <div class="request-info">
                <span class="info">Author:</span> ${matchingIsbn.bookAuthor}
              </div>
              <div class="request-info">
                <span class="info">Quantity:</span> ${element.quantity}
              </div>
              <div class="request-info">
                <span class="info">Status:</span>
                <span class="status">Pending</span>
                </div>
                <div class="cancel-div"><button class="cancel-button js-cancel-button" data-isbn="${bookIsbn}">Cancel Request</button></div>
                </div>
          </div>
        </div>
      `;

      // Add the generated HTML to the page
      if (reviewGrids) {
        reviewGrids.innerHTML += htmlContent;
      }
    }
  });
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  renderBorrowedBooks();
});

// Export the function so it can be called from other scripts
export { renderBorrowedBooks };

// Handle cancel button clicks (event delegation)
import { removeFromCart } from "./borrow-cart.js";

document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("js-cancel-button")) {
    const isbn = e.target.dataset.isbn;
    if (isbn) {
      removeFromCart(isbn);
      renderBorrowedBooks();
    }
  }
});
