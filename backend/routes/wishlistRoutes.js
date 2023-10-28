const express = require("express");
const router = express.Router();
const {
  createWishlist,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Create a new wishlist
router.post("/wishlist", createWishlist);

// Get a user's wishlist
router.get("/wishlist", getWishlist);

// Add a product to the wishlist
router.post("/wishlist/add/:productId", addToWishlist);

// Remove a product from the wishlist
router.delete("/wishlist/remove/:productId", removeFromWishlist);

module.exports = router;
