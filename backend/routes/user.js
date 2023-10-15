const express = require("express");

// Controller functions
const {
  loginUser,
  signupUser,
  isAdmin,
  verifySeller,
} = require("../controllers/userController");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route for regular users
router.post("/signup", signupUser);
router.patch("/verify-seller", isAdmin, verifySeller);

module.exports = router;
