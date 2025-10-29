// This module manages the borrow cart using local storage.
// It provides functions to get, add, remove, and clear items in the cart.
// Each item in the cart is represented by an object with 'isbn' and 'quantity' properties.

const STORAGE_KEY = "libraryCart";

// Load the cart from local storage
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

// Save the cart to local storage
function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (_) {}
}

export function getCart() {
  return loadCart();
}

// Add a book to the cart or increase its quantity if it already exists
export function addToCart(bookIsbn) {
  const cart = loadCart();
  let matchingItem;

  cart.forEach((item) => {
    if (item.isbn === bookIsbn) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ isbn: bookIsbn, quantity: 1 });
  }

  saveCart(cart);
}

// Remove a book from the cart based on its ISBN
export function removeFromCart(bookIsbn) {
  const cart = loadCart();
  const next = cart.filter((item) => item.isbn !== bookIsbn);
  saveCart(next);
}

export function clearCart() {
  saveCart([]);
}
