const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const router = require("./user");

router.get("/get-cart/:userId", getCart);
router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);

module.exports = router;
