const express = require("express");

// Controller functions
const {
  loginUser,
  signupUser,
  isAdmin,
  verifySeller,
  deleteSeller,
  getVerifiedSellers,
  getUnverifiedSellers,
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/userController");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route for regular users
router.post("/signup", signupUser);
router.patch("/verify-seller", isAdmin, verifySeller);
router.delete("/delete-seller", isAdmin, deleteSeller);
router.get("/getVerified-sellers", getVerifiedSellers);
router.get("/getUnverified-sellers", getUnverifiedSellers);
router.get("/get-cart", getCart);
router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);

module.exports = router;
