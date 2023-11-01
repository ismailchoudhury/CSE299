const express = require("express");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/get-wishlist", getWishlist);
router.post("/add-to-wishlist", addToWishlist);
router.post("/remove-from-wishlist", removeFromWishlist);
module.exports = router;
