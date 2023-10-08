const express = require("express");

// Controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route for regular users
router.post("/signup", signupUser);

module.exports = router;
