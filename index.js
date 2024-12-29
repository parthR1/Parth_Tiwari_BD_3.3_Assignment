const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Data

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Functions

// Given an items's id, name, price and quantity as arguments, add the item to the carts array
function addItemToCart(prodId, prodName, prodPrice, prodQtty) {
  let newItemObj = {
    productId: prodId,
    name: prodName,
    price: prodPrice,
    quantity: prodQtty,
  };
  cart.push(newItemObj);
}

// Given product Id and product quantity as query params, edit the quantity of an existing item in the cart
function updateItemQuantity(targetProdId, prodQtty) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === targetProdId) {
      cart[i].quantity = prodQtty;
      break;
    }
  }
}

// Given product Id as query param, remove the product object from the cart that matches the prod Id
function removeProductById(prodId) {
  return cart.filter((itemObj) => itemObj.productId !== prodId);
}

// Calculate and return the total quantity of items in the cart
function getTotalQuantityOfItems(cartArray) {
  let totalQtty = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalQtty += cartArray[i].quantity;
  }
  return totalQtty;
}

// Calculate and return the total price of items in the cart based on their quantities and individual prices
function getTotalPrice(cartArray) {
  let totalPrice = 0;
  for (let i = 0; i < cartArray.length; i++) {
    totalPrice += cartArray[i].price * cartArray[i].quantity;
  }
  return totalPrice;
}

// Endpoint 1: Add an item to the cart given product Id, name, price and quantity as query params
app.get('/cart/add', (req, res) => {
  let prodId = parseInt(req.query.productId);
  let prodName = req.query.name;
  let prodPrice = parseInt(req.query.price);
  let prodQtty = parseInt(req.query.quantity);
  addItemToCart(prodId, prodName, prodPrice, prodQtty);
  res.json({ cartItems: cart });
});

// Endpoint 2: Edit the quantity of an existing item in the cart based on the product ID
app.get('/cart/edit', (req, res) => {
  let prodId = parseInt(req.query.productId);
  let prodQtty = parseInt(req.query.quantity);
  updateItemQuantity(prodId, prodQtty);
  res.json({ cartItems: cart });
});

// Endpoint 3: Delete an item in the cart by product ID given as query param
app.get('/cart/delete', (req, res) => {
  let prodId = parseInt(req.query.productId);
  let result = removeProductById(prodId);
  cart = result; // Update the cart array
  res.json({ cartItems: cart });
});

// Endpoint 4: Return the current list of items in the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate and return the total quantity of items in the cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQtty = getTotalQuantityOfItems(cart);
  res.json({ totalQuantity: totalQtty });
});

// Endpoint 6: Calculate and return the total price of items in the cart based on their quantities and individual prices
app.get('/cart/total-price', (req, res) => {
  let cartTotalPrice = getTotalPrice(cart);
  res.json({ totalPrice: cartTotalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
